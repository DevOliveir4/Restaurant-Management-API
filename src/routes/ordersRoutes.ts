import { Router } from "express";
import { OrdersController } from "@/controllers/OrdersController";

export const  ordersRoutes = Router()
const ordersController = new OrdersController()

ordersRoutes.put("/", ordersController.create)
ordersRoutes.get("/table-session/:table_session_id", ordersController.index)
ordersRoutes.get("/table-session/:table_session_id/total", ordersController.show)

