import razorpay from "razorpay";

// Razor pay instance
const Razorpay = new razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID,
  key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});

export default Razorpay;
