import { Router } from "express";
import { ProductsController } from "../controllers/ProductsController";

export const productsRoutes = Router()
const productsController = new ProductsController()

productsRoutes.get("/", productsController.index)
