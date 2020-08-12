export type PaymentResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  DISPATCHED = "DISPATCHED",
  COMPLETE = "COMPLETE",
}

export enum PaymentStatus {
  CAPTURED = "CAPTURED",
  ERROR = "ERROR",
}

export type Order = {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: OrderStatus;
  attempts: number;
  notes: string[];
};

export type Payment = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  order_id: string;
  invoice_id: string;
  international: boolean;
  method: string;
  amount_refunded: number;
  refund_status: string;
  description?: string;
  card_id: string;
  bank: string;
  wallet: string;
  vpa: string;
  email: string;
  contact: string;
  notes: string[];
  fee: number;
  tax: number;
  acquirer_data: {
    rrn: string;
    upi_transaction_id: string;
  };
};
