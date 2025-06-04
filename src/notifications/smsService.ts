import axios from 'axios';

export async function sendSMS(to: string, message: string): Promise<void> {
    try {
        const response = await axios.post('https://apps.mnotify.net/smsapi', {
            params: {
                key: process.env.MNOTIFY_API_KEY,
                to: to,
                msg: message,
                sender_id: process.env.MNOTIFY_SENDER_ID,
            },
        });

        console.log('SMS response:', response.data);

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error sending SMS:', error.response?.data || error.message);
        } else {
            console.error('Unexpected Error:', error);
        }
    }
}

//sendSMS('0541243508', 'Test SMS here');