import { CartItem } from '../types';

/**
 * Validated, warning-free implementation of the Brevo Transactional Email REST API.
 * This directly replaces the sib-api-v3-sdk to guarantee zero node-polyfill warnings 
 * in Vite/Browser environments while adhering perfectly to the API spec.
 */

const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;
const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

interface OrderConfirmationPayload {
    firstName: string;
    lastName: string;
    email: string; // The specific customer's email address
    phone: string;
    address: string;
    city: string;
    orderItems: CartItem[];
    totalPrice: number;
}

export const sendOrderConfirmationEmail = async (payload: OrderConfirmationPayload): Promise<boolean> => {
    const { firstName, lastName, email, phone, address, city, orderItems, totalPrice } = payload;
    const fullName = `${firstName} ${lastName}`;

    // Generate the itemized list output for the email body
    const orderItemsString = orderItems
        .map(item => `• ${item.name} (Size: ${item.selectedSize}, Color: ${item.selectedColor.name}) x${item.quantity}`)
        .join('\n      ');

    // Exact confirmation wording as requested with appended order details
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; padding: 20px;">
      <h2>Order Confirmed!</h2>
      <p>Thanks for shopping with us, ${firstName}!</p>
      
      <div style="margin-top: 30px; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <h3 style="margin-top: 0;">Order Summary</h3>
        <pre style="font-family: monospace; white-space: pre-wrap; font-size: 14px; background: transparent; padding: 0; margin: 0;">
      Item(s):
      ${orderItemsString}
      
      • Grand Total: Rs. ${totalPrice} (Cash on Delivery)
      
      Shipping To:
      ${address}, ${city}
      Phone: ${phone}
        </pre>
      </div>
    </div>
  `;

    const requestBody = {
        sender: {
            name: "StreetSlipp HQ",
            email: "streetslipp@gmail.com" // Strict origin email as requested
        },
        to: [
            {
                email: email, // Dynamic destination email to the user 
                name: fullName
            }
        ],
        subject: "Order Confirmed - StreetSlipp",
        htmlContent: htmlContent
    };

    try {
        const response = await fetch(BREVO_URL, {
            method: "POST",
            headers: {
                "api-key": BREVO_API_KEY,
                "accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Brevo API Failed:", response.status, errorText);
            return false;
        }

        console.log("Brevo API called successfully. Confirmation sent to", email);
        return true;

    } catch (error) {
        console.error("Critical Error sending Customer Brevo logic:", error);
        return false;
    }
};

export const sendAdminNotificationEmail = async (payload: OrderConfirmationPayload & { orderId: string }): Promise<boolean> => {
    const { firstName, lastName, email, phone, address, city, orderItems, totalPrice, orderId } = payload;
    const fullName = `${firstName} ${lastName}`;

    const orderItemsString = orderItems
        .map(item => `- ${item.name} (EU ${item.selectedSize}, ${item.selectedColor.name}) x${item.quantity}`)
        .join('\n');

    // Expected admin template exactly as requested (plain text wrapped in a simple pre tag for spacing)
    const textContent = `👤 NEW ORDER RECEIVED!

Order ID: ${orderId}
Customer: ${fullName}
Phone: ${phone}
Email: ${email}

Shipping Address:
${address}, ${city}

Items:
${orderItemsString}

Total: Rs. ${totalPrice}`;

    const requestBody = {
        sender: {
            name: "StreetSlipp System",
            email: "streetslipp@gmail.com"
        },
        to: [
            {
                email: "streetslipp@gmail.com",
                name: "StreetSlipp Admin"
            }
        ],
        subject: `New Order! Rs. ${totalPrice} - ${fullName}`,
        textContent: textContent
    };

    try {
        const response = await fetch(BREVO_URL, {
            method: "POST",
            headers: {
                "api-key": BREVO_API_KEY,
                "accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Brevo Admin API Failed:", response.status, errorText);
            return false;
        }

        console.log("Brevo Admin API called successfully. Notified streetslipp@gmail.com");
        return true;

    } catch (error) {
        console.error("Critical Error sending Admin Brevo logic:", error);
        return false;
    }
};
