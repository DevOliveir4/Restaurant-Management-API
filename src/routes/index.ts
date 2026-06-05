import { Router } from "express";
import { productsRoutes } from "./productsRoutes";
import { tablesRoutes } from "./tablesRoutes";

export const routes = Router()
routes.use("/products", productsRoutes)
routes.use("/tables", tablesRoutes) 