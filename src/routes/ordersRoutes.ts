import { Router } from "express";
import { OrdersController } from "@/controllers/OrdersController";

export const  ordersRoutes = Router()
const ordersController = new OrdersController()

ordersRoutes.put("/", ordersController.create)

