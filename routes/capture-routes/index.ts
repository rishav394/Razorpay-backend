import axios from "axios";
import express from "express";
import { constants, Strings } from "../../constants";
import OrderModel from "../../model/order";
import PaymentModel from "../../model/payment";
import { Payment, PaymentResponse } from "../../types";
import { generateRazorpayRequestURL, verifyPayment } from "../../util";

const router = express.Router();

router.post("/:paymentId", (req, res) => {
  // Capture is actually a two step Process
  // 1. Verify Payment
  // 2. Capture so that we can settle it from out bank

  // Step 1 >> Verification
  const paymentResponse = req.body as PaymentResponse;
  const isPaymentVerified = verifyPayment(paymentResponse);
  if (!isPaymentVerified) {
    // User is trying to somewhere he shouldnt. 403.
    return res.status(403).json({
      message: Strings.unverifiedPayment,
    });
  }

  // Step 2 >> Capture
  axios
    .post<Payment>(generateRazorpayRequestURL(req.params.paymentId), {
      amount: req.body.amount * 100,
      currency: constants.currency,
    })
    .then(async (response) => {
      const data = response.data;
      try {
        await PaymentModel.create({
          payment_id: data.id,
          amount: data.amount,
          fee: data.fee,
          order_id: data.order_id,
          tax: data.tax,
          invoice_id: data.invoice_id,
          international: data.international,
          method: data.method,
          amount_refunded: data.amount_refunded,
          refund_status: data.refund_status,
          description: data.description,
          card_id: data.card_id,
          bank: data.bank,
          wallet: data.wallet,
          vpa: data.vpa,
          email: data.email,
          contact: data.contact,
        });
        await OrderModel.findOneAndUpdate(
          {
            order_id: data.order_id,
          },
          {
            payment_id: data.id,
          }
        );
        res.status(200).send(Strings.okPayment);
      } catch (err) {
        return res.status(500).json({
          message: err.message,
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
});

export default router;
