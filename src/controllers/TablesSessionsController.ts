import { Request, Response, NextFunction } from "express";

export class TablesSessonsController {
    async create(request: Request, response:Response, next: NextFunction){
        try {
            return response.json({ message: "ok"})
        } catch (error) {
            next(error)
        }
    }
}