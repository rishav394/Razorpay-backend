import express from "express";
import { constants, Strings } from "../../constants";
import razorpay from "../../lib/razorpay";
import OrderModel from "../../model/order";
import { Order, OrderStatus } from "../../types";

const router = express.Router();

router.post("/", (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // Convert the amount into smallest unit possible
      currency: constants.currency,
      receipt: "Payment_for_something", // This has to be company generated and is totally optional
      payment_capture: 0, // Manual capture
    };

    razorpay.orders.create(options, async function (err: any, order: Order) {
      if (err) {
        return res.status(500).json({
          message: Strings.internalError,
        });
      }
      await OrderModel.create({
        order_id: order.id,
        amount: order.amount,
        status: OrderStatus.PENDING,
        receipt: order.receipt,
        currency: order.currency,
      });

      return res.status(200).json(order);
    });
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
});

export default router;
