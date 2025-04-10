// storage.ts
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import {Readable} from "stream";
import {PutFileParams} from "../types/storage.types";
import {extname} from "path";
import { lookup } from 'mime-types';

class StorageService {

    private readonly s3: S3Client;
    private readonly bucket: string;
    private readonly cloudFrontUrl: string;

    constructor() {
        this.bucket = process.env.AWS_BUCKET || '';
        this.cloudFrontUrl = process.env.AWS_CLOUDFRONT_URL || '';
        this.s3 = new S3Client({
            region: process.env.AWS_DEFAULT_REGION || '',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
            },
        });
    }

    async putFile({ body, fileName, folder = 'public' }: PutFileParams ): Promise<{ generatedFilePath: string, mimeType: string | false }> {

        const ext = extname(fileName);
        const mimeType = lookup(fileName);

        const adjustedPath = uuidv4();
        const generatedFilePath = `${folder}/${adjustedPath}${ext}`;

        await this.s3.send(new PutObjectCommand({
            Bucket: this.bucket,
            Key: generatedFilePath,
            Body: body,
        }));

        return { generatedFilePath: generatedFilePath, mimeType: mimeType };
    }

    async getTemporaryUrl(path: string, expiresIn = 3600) {
        const command = new GetObjectCommand({
            Bucket: this.bucket,
            Key: path,
        });
        return getSignedUrl(this.s3, command, { expiresIn });
    }

    async getFile(path: string) {
        const parts = path.split('/').filter(Boolean);
        let folder = undefined // root folder
        if(parts.length > 1) {
            folder = parts[0]
        }
        if(folder === 'public') {
            return this.cloudFrontUrl + path;
        }
        // return temporary signed url. if it's not in public folder and doesn't need download
        return await this.getTemporaryUrl(path);
    }

    async downloadFile(path: string): Promise<{ buffer: Buffer, contentType?: string }> {
        const command = new GetObjectCommand({
            Bucket: this.bucket,
            Key: path,
        });

        const response = await this.s3.send(command);

        if (!response.Body) {
            throw new Error('No body found in S3 response');
        }

        const stream = response.Body as Readable;
        const chunks: Uint8Array[] = [];

        for await (const chunk of stream) {
            chunks.push(chunk as Uint8Array);
        }

        const buffer = Buffer.concat(chunks);
        const contentType = response.ContentType;

        return { buffer, contentType };

        // call it like this
        // res.setHeader('Content-Type', contentType || 'application/octet-stream');
        // res.send(buffer);
    }
}

export const storage = new StorageService();
