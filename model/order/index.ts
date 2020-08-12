import mongoose from "mongoose";
import { OrderStatus } from "../../types";
const ObjectId = mongoose.Schema.Types.ObjectId;

export interface ISingleOrder extends mongoose.Document {
  order_id: string;
  customer_id?: mongoose.Types.ObjectId;
  payment_id?: string;
  amount: number;
  status: OrderStatus;
  currency?: string;
  receipt: string;
}

const OrderSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
    },
    customer_id: {
      type: ObjectId,
      required: false, // This would be true but in this assignment there is no construct as users
    },
    currency: {
      type: String,
      default: "INR",
    },
    payment_id: {
      type: String,
      required: false, // When this is not present we know that the payment isnt even initialted
    },
    // Amount should ideally be a sum of all items in the order but again items is not a construct in our system
    amount: {
      type: Number,
      required: true,
    },
    receipt: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "DISPATCHED", "COMPLETE"],
      required: true,
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

const OrderModel = mongoose.model<ISingleOrder>("Order", OrderSchema);

export default OrderModel;
