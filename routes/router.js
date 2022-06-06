import express from "express";
import authRouter from "./auth.js";
import supplierRouter from "./suppliers.js";

const routes = express.Router()
routes.use('/auth', authRouter)
routes.use('/supplier', supplierRouter)

export default routes