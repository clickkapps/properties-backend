import { sendEmail } from './emailService';
import { sendSMS } from './smsService';

type Channel = 'email' | 'sms';

interface NotificationOptions {
    to: string;
    channel: Channel;
    subject?: string;
    templateName?: string;
    variables?: Record<string, any>;
    message?: string;
}

export async function notify(options: NotificationOptions) {
    switch (options.channel) {
        case 'email':
            return sendEmail(options.to, options.subject!, options.templateName!, options.variables!);
        case 'sms':
            return sendSMS(options.to, options.message!);
    }
}
