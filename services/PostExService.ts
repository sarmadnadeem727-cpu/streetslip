
export interface OrderData {
    orderRefNumber: string;
    invoicePayment: number;
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    cityName: string;
    items: number;
}

export interface TrackingInfo {
    trackingNumber: string;
    orderStatus: string; // The text status
    messageCode: string; // The numeric code (0001, 0005, etc)
    transactionStatus: string;
    orderRefNumber: string;
}

const API_TOKEN = "OTVmYjQ2ZjdjMzVkNDgzOWJjY2FjODFkYWJlMDQxMDA6YzgxMjI4OWQ5NzM2NDE1YmI3YzgyMWI3ZDA5MjY1NWU=";
const BASE_URL = "https://api.postex.pk/services/integration/api";

export class PostExService {

    private static getHeaders() {
        return {
            "Content-Type": "application/json",
            "token": API_TOKEN
        };
    }

    // 1. Create Order (V3)
    static async createOrder(data: OrderData) {
        const payload = {
            orderRefNumber: data.orderRefNumber,
            invoicePayment: data.invoicePayment,
            customerName: data.customerName,
            customerPhone: data.customerPhone, // Must be 03XXXXXXXXX
            deliveryAddress: data.deliveryAddress,
            cityName: data.cityName,
            orderType: "Normal",
            items: data.items,
            // Optional/Default fields to ensure smoother processing if needed
            pickupAddressCode: "default",
        };

        try {
            const response = await fetch(`${BASE_URL}/order/v3/create-order`, {
                method: "POST",
                headers: this.getHeaders(),
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`PostEx API Error: ${response.status} - ${errorText}`);
            }

            const result = await response.json();

            // PostEx success usually returns something like { "dist": { "trackingNumber": "..." } } or similar structure
            // Adjust based on actual API response if documentation differs slightly
            if (result.statusCode === "200" || result.dist?.trackingNumber) {
                return result.dist?.trackingNumber || result.trackingNumber;
            } else {
                throw new Error(result.message || "Order creation failed");
            }

        } catch (error) {
            console.error("PostEx Create Order Failed:", error);
            // Log the payload for debugging (be careful with PII in production, but needed now)
            console.error("Payload was:", JSON.stringify(payload, null, 2));
            throw error;
        }
    }

    // 2. Track Order (V1)
    static async trackOrder(trackingNumber: string): Promise<TrackingInfo> {
        try {
            const response = await fetch(`${BASE_URL}/order/v1/track-order/${trackingNumber}`, {
                method: "GET",
                headers: this.getHeaders(),
            });

            if (!response.ok) {
                throw new Error(`Tracking API Error: ${response.status}`);
            }

            const result = await response.json();

            // Mapping response to our interface
            // The API structure for tracking usually returns a list or a single object.
            // Assuming a standard response structure.

            return {
                trackingNumber: result.trackingNumber || trackingNumber,
                orderStatus: result.orderStatus || "Unknown",
                messageCode: result.messageCode || "0000",
                transactionStatus: result.transactionStatus || "Pending",
                orderRefNumber: result.orderRefNumber
            };

        } catch (error) {
            console.error("PostEx Tracking Failed:", error);
            throw error;
        }
    }

    // 3. Get Invoice / Airway Bill
    static async getInvoiceUrl(trackingNumber: string): Promise<string> {
        // This endpoint normally returns a raw PDF or a link.
        // If it returns raw bytes, we might need blob handling. 
        // For now, returning the direct link pattern if applicable, or fetching to get the link.

        // Ideally, we redirect the user to this URL or fetch and blob it.
        return `${BASE_URL}/order/v1/get-invoice?trackingNumbers=${trackingNumber}`;
    }
}
