import fs from 'fs';
import path from 'path';

export interface SSLConfig {
    rejectUnauthorized: boolean;
    ca?: string;
}

export const getSSLConfig = (): SSLConfig | undefined => {
    const sslPath = process.env.DB_CERT_PATH;
    const inProductionMode = process.env.NODE_ENV === 'production';

    if (!inProductionMode) {
        console.log('customLog', 'Not in production mode, skipping SSL configuration');
        return undefined;
    }

    if (!sslPath) {
        console.log('customLog', 'DB_CERT_PATH environment variable not set');
        return undefined;
    }

    try {
        // Check if file exists in container
        if (!fs.existsSync(sslPath)) {
            console.log('customLog', `SSL certificate not found at: ${sslPath}`);
            console.log('customLog', 'Current working directory:', process.cwd());
            console.log('customLog', 'Directory contents:', fs.readdirSync(path.dirname(sslPath)));
            return undefined;
        }

        const certificate = fs.readFileSync(sslPath, 'utf8');

        if (!certificate.includes('-----BEGIN CERTIFICATE-----')) {
            console.log('customLog', 'File does not contain valid certificate data');
            return undefined;
        }

        console.log('customLog', 'SSL certificate loaded successfully');

        return {
            rejectUnauthorized: true,
            ca: certificate
        };

    } catch (error) {
        console.error('customLog', 'Error loading SSL certificate:', error);
        return undefined;
    }
};