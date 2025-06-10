import axios from 'axios';

export async function sendSMS(to: string, message: string): Promise<void> {

    try {
        const apiKey = process.env.MNOTIFY_API_KEY;
        const senderId = process.env.MNOTIFY_SENDER_ID;
        console.log("senderId: ", senderId, ", key: ", apiKey)
        const response = await axios.post(`https://api.mnotify.com/api/sms/quick?key=${apiKey}`,{
            "recipient": [to],
            "sender": senderId,
            "message": message,
            "is_schedule": "false",
            "schedule_date": ""
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