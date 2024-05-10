import express from "express";
import  requireAuth  from "../middlewares/requireAuth.js"
import { getMyInvoice } from "../controllers/invoiceController.js";

const invoiceRouter = express.Router()

invoiceRouter.use(requireAuth)

invoiceRouter.get('/', getMyInvoice )


export default invoiceRouter;