import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

export interface ISinglePayment extends mongoose.Document {
  payment_id: string;
  amount: number;
  currency?: string;
  order_id: string;
  invoice_id?: string;
  international?: boolean;
  method?: string;
  amount_refunded?: number;
  refund_status?: string;
  description?: string;
  card_id?: string;
  bank?: string;
  wallet?: string;
  vpa?: string;
  email?: string;
  contact?: string;
  notes?: string[];
  fee: number;
  tax: number;
  upi_transaction_id?: string;
}

const PaymentSchema = new mongoose.Schema(
  {
    payment_id: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
      required: false,
    },
    // Every payment has to have a order with it
    order_id: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    invoice_id: {
      type: String,
      required: false,
    },
    international: {
      type: Boolean,
      required: false,
    },
    amount_refunded: {
      type: Number,
      required: false,
    },
    refund_status: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    card_id: {
      type: String,
      required: false,
    },
    bank: {
      type: String,
      required: false,
    },
    wallet: {
      type: String,
      required: false,
    },
    vpa: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    contact: {
      type: String,
      required: false,
    },
    fee: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    upi_id: {
      type: String,
      required: false,
    },
  },
  {
    // This is very important
    // Mongoose with record
    // 1. ORDER CREATED TIME
    // 2. ORDER UPDATED TIME
    timestamps: true,
  }
);

const PaymentModel = mongoose.model<ISinglePayment>("Payment", PaymentSchema);

export default PaymentModel;
