import razorpay from "razorpay";
import crypto from "crypto";
import { Payment } from "../models/invoice.model.js";
import { User } from "../models/user.model.js"
import { Course } from "../models/course.model.js";

// VERY VERY PRIVATE SECRET KEY FETCHING
const instance = new razorpay({
  key_id: process.env.KEY,
  key_secret: process.env.PAYMENT_SECRET,
});

// HERE ORDER DETAIL AND AMOUNT LOGIC IMPLEMENTED
export const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({ success: true, order });
  } catch (e) {
    console.log(e);
  }
};

export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.PAYMENT_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuth = expectedSignature === razorpay_signature;

    if (!isAuth) {
      throw new Error("Payment verification failed.");
    }

    const userId = req.user._id;
    const { courseId } = req.body;

    const paymentInvoice = {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      user: userId,
      course: courseId
    };

    await Payment.create(paymentInvoice);

    const updateOptions = { $push: { courses: courseId } };
    const userUpdateResult = await User.findByIdAndUpdate(userId, updateOptions, { new: true });

    if (!userUpdateResult) {
      throw new Error("Failed to update user's courses.");
    }

    const courseUpdateResult = await Course.findByIdAndUpdate(courseId, { $push: { enrolledStudents: userId } }, { new: true });

    if (!courseUpdateResult) {
      throw new Error("Failed to update course's enrolled students.");
    }

    res.redirect(`http://localhost:3000/paymentDone?reference=${razorpay_payment_id}`);
  } catch (error) {
    console.error("Error during payment verification:", error);
    res.status(400).json({ success: false, error: error.message });
  }
};


export const getKey = (req, res) => {
  return res.status(200).json({ key: process.env.KEY });
};
