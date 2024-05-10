import { Payment } from "../models/invoice.model.js";

export const getMyInvoice = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all payments made by the user and populate the associated course details
    const invoices = await Payment.find({ user: userId }).populate("course");

    res.status(200).json({ success: true, invoices });
  } catch (error) {
    console.error("Error getting invoices details:", error);
    res.status(400).json({ success: false, error: error.message });
  }
};
