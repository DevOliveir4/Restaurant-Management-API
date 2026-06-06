import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import { z } from "zod"
import { AppError } from "@/utils/AppError";

export class TablesSessonsController {
    async create(request: Request, response:Response, next: NextFunction){
        try {
            const bodySchema = z.object({
                table_id: z.number()
            })

            const { table_id } = bodySchema.parse(request.body)

            const sessions =  await knex<TablesSessionsRepository>("tables_sessions").select().where({ table_id: table_id }).orderBy("table_session_opened_at", "desc").first()

            if(sessions && !sessions.table_session_closed_at) {
                throw new AppError("Essa mesa já esta aberta")
            }

            await knex<TablesSessionsRepository>("tables_sessions").insert({ table_id: table_id, table_session_opened_at: knex.fn.now()})

            return response.json({ message: "ok"})
        } catch (error) {
            next(error)
        }
    }
}