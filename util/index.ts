import crypto from "crypto";
import { PaymentResponse } from "../types";

/**
 * Returns the capturing URL for the payment ID
 * @param paymentId The razor pay payment ID
 */
export const generateRazorpayRequestURL = (paymentId: string) => {
  return `https://${process.env.RAZOR_PAY_KEY_ID}:${process.env.RAZOR_PAY_KEY_SECRET}@api.razorpay.com/v1/payments/${paymentId}/capture`;
};

/**
 * Returns the hax for the generated payment response
 * @param response The razorpay response which is used for verifications
 */
export const generateHmac = (response: PaymentResponse) => {
  const hmac = crypto.createHmac("sha256", process.env.RAZOR_PAY_KEY_SECRET!);
  hmac.update(response.razorpay_order_id + "|" + response.razorpay_payment_id);
  return hmac.digest("hex");
};

/**
 * Checks if the response hash is same as the signature which razorpay sent us
 * @param response The razorpay response which is used for verifications
 */
export const verifyPayment = (response: PaymentResponse) => {
  const hmacSignature = generateHmac(response);
  return response.razorpay_signature === hmacSignature;
};
