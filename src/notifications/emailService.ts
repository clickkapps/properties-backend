import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Replace placeholders in the HTML template with actual values.
 * @param html - The HTML content with placeholders.
 * @param variables - An object containing variable keys and values.
 * @returns The processed HTML content with variables replaced.
 */
const replaceTemplateVariables = (html: string, variables: Record<string, string>) => {
    return html.replace(/{{\s*(\w+)\s*}}/g, (match, p1) => variables[p1] || match);
};

/**
 * Sends an email using the provided recipient and dynamic variables.
 * @param view - the html template to use as view.
 * @param recipient - The email address of the recipient.
 * @param variables - An object containing variable keys and values.
 */

type SendEmailParams = {
    view: string,
    recipient: string,
    subject: string,
    variables: Record<string, string>
}

const sendEmail = async (args: SendEmailParams) => {
    try {
        const templatePath = path.join(__dirname, `../../build_local/src/${args.view}.html`);
        const htmlContent = fs.readFileSync(templatePath, 'utf-8');

        // Replace variables in the template
        const processedHtml = replaceTemplateVariables(htmlContent, args.variables);

        // Google SMTP Transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // Use TLS
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: `"${process.env.EMAIL_FROM}" <no-reply@lookforproperties.com>`,
            to: args.recipient,
            subject: args.subject,
            html: processedHtml,
        });

        console.log(`Message sent: ${info.messageId}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export default sendEmail;


// await sendEmail({
//     view: 'welcome',
//     recipient: 'danielkwakye1000@gmail.com',
//     subject: "Welcome!",
//     variables: {
//         name: "Daniel Kwakye",
//     }
// });