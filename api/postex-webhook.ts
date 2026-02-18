import type { VercelRequest, VercelResponse } from '@vercel/node';

// SECURITY CONFIGURATION
// Enter these into the PostEx Portal > Webhooks Section
export const WEBHOOK_CONFIG = {
    HEADER_KEY: "x-streetslipp-auth",
    HEADER_VALUE: "SLIPP_SECURE_V1_9928374" // Generated secure token
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // 1. SECURITY CHECK
    const authHeader = req.headers[WEBHOOK_CONFIG.HEADER_KEY];
    if (authHeader !== WEBHOOK_CONFIG.HEADER_VALUE) {
        return res.status(401).json({ error: 'Unauthorized: Invalid Security Token' });
    }

    try {
        const { orderRefNumber, trackingNumber, messageCode, orderStatus } = req.body;

        console.log(`[PostEx Webhook] Update for ${orderRefNumber}: ${orderStatus} (${messageCode})`);

        // 2. MAPPING LOGIC (Backend Side)
        // You would typically update your database here

        /* 
        POSTEX STATUS MAPPING:
        ----------------------
        0001 (Booked/Warehouse) -> Trigger "Pixel Heart" state in DB
        0004 (On Route)         -> Trigger "Box Truck" state in DB
        0005 (Delivered)        -> Trigger "Floating Crown" state in DB
        0002/0006 (Returned)    -> Trigger "Glitch Cross" state in DB
        */

        // Example DB Update:
        // await db.orders.update({ where: { orderRefNumber }, data: { status: messageCode } });

        return res.status(200).json({ success: true, message: "Webhook received and verified" });

    } catch (error) {
        console.error("Webhook Processing Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
