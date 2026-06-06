import { Router } from "express";
import { TablesSessonsController } from "@/controllers/TablesSessionsController";

export const tablesSessionsRoutes = Router()
const tablesSessionsController = new TablesSessonsController()

tablesSessionsRoutes.post("/", tablesSessionsController.create)
tablesSessionsRoutes.get("/", tablesSessionsController.index)