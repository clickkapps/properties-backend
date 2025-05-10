import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.MAIL_PASSWORD,
    },
});

export async function sendEmail(
    to: string,
    subject: string,
    templateName: string,
    variables: Record<string, any>
) {
    const compiledPath = path.join(__dirname, `compiled/${templateName}.html`);
    let html = fs.readFileSync(compiledPath, 'utf-8');

    // Replace {{variable}} placeholders
    for (const [key, val] of Object.entries(variables)) {
        html = html.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), val);
    }

    await transporter.sendMail({
        from: `"My App" <${process.env.MAIL_FROM}>`,
        to,
        subject,
        html,
    });
}
