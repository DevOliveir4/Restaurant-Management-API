import { Router } from "express";
import { productsRoutes } from "./productsRoutes";

export const routes = Router()
routes.use("/products", productsRoutes) 