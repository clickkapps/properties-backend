import Subscription from "../models/Subscription";
import {generateKey} from "../helpers/utils";
import sendEmail from "../notifications/emailService";
import User from "../models/User";
import {sendSMS} from "../notifications/smsService";

export type SendInvoiceParams = {
    userId?: number;
    subscriptionId?: number,
}

export const sendInvoice = async (args: SendInvoiceParams) => {

    const user = await User.findByPk(args.userId);

    if (!user) {
        throw new Error("Invalid user");
    }

    const subscription = await Subscription.findByPk(args.subscriptionId);
    if (!subscription) {
        throw new Error("Invalid subscription");
    }

    let invoiceId = subscription.invoiceId

    if(!invoiceId) {
        invoiceId = generateKey()
        await subscription.update({ invoiceId: invoiceId})
    }

    await  subscription.update({
        lastInvoiceSentAt: new Date(),
        invoiceNotificationsCount: (subscription.invoiceNotificationsCount || 0) + 1
    });

    const invoicePaymentLink = `${process.env.WEB_APP_URL}/public/invoice/${invoiceId}`;
    const adminContactPhone = process.env.ADMIN_CONTACT_PHONE;

    const messageGreetings = `Good day ${user.firstName} ${user.lastName}`
    const messageContent = `An invoice has been generated for you.`

    let description = "You requested a service with LookForProperties.com"
    if(subscription.serviceType == "property_showing") {
        description = `You requested property viewing with LookForProperties.com`
    }

    if(user.contactEmail) {

        sendEmail({
            subject: "Invoice!",
            recipient: user.contactEmail,
            variables: {
                messageGreetings,
                messageContent,
                invoicePaymentLink,
                invoiceNumber: `#${subscription.id}`,
                amount: `${subscription.currency} ${subscription.amountPayable}`,
                description: description,
                adminContactPhone: adminContactPhone || 'support'
            },
            view: 'invoice',
        }).catch(error => {
            console.log("Error sending email:", error.message)
        });
    }

    if(user.contactPhone) {
        const textMessage = `${messageGreetings},\n\n
${messageContent}.${description}\n\n
Click on the link below to complete payment\n
${invoicePaymentLink}\n\n
If you do not recognize this activity please call ${adminContactPhone}`

        sendSMS(user.contactPhone, textMessage).catch(error => {
            console.log("Error sending SMS:", error.message)
        })
    }

}

const sendWelcomeMessage = async () => {

}