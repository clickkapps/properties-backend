import crypto from "crypto";
import bcrypt from "bcrypt";
import multer from "multer";


/**
 * Generates a long hashed string (public key) using SHA-256.
 * @returns A secure, unique hashed public key.
 */
export const generateKey = (): string => {
    return crypto.createHash("sha256").update(crypto.randomBytes(64)).digest("hex");
};


/**
 * Hashes a password using bcrypt.
 * @param password - The plaintext password to hash.
 * @param saltRounds - The number of salt rounds (default: 10).
 * @returns A hashed password.
 */
export const hashPassword = async (password: string, saltRounds = 10): Promise<string> => {
    return await bcrypt.hash(password, saltRounds);
};

/**
 * Compares a plaintext password with a hashed password.
 * @param password - The plaintext password.
 * @param hash - The stored hashed password.
 * @returns A boolean indicating whether the password matches.
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};

export function generateRandomCode(length: number = 6): string {
    const digits = '0123456789';
    let otp = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        otp += digits[randomIndex];
    }

    return otp;
}

export const requestFile = multer({
    storage: multer.memoryStorage(), // Store file in memory for now
});

export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, '-')  // Replace spaces and non-word characters with -
        .replace(/^-+|-+$/g, '');   // Remove starting and ending hyphens
}