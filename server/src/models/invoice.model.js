import mongoose from "mongoose";

const paymentschema = new mongoose.Schema(
  {
    razorpay_order_id: {
      type: String,
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      required: true,
    },
    razorpay_signature: {
      type: String,
      required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }

  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentschema);