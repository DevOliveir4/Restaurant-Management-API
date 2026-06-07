import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import { z } from "zod"
import { AppError } from "@/utils/AppError";
import { table } from "console";

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

    async index(request: Request, response:Response, next: NextFunction) {
        try {
            const tablesSessions = await knex<TablesSessionsRepository>("tables_sessions").select().orderBy("table_session_closed_at")

            return response.json(tablesSessions)
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response:Response, next: NextFunction) {
        try {
            const id = z.string().transform((value) => Number(value)).refine((value) => !isNaN(value), { message: "o id precisa ser um número" }).parse(request.params.id)

            const sessions = await knex<TablesSessionsRepository>("tables_sessions").select().where({ table_session_id: id }).first()

            if (!sessions) {
                throw new AppError("Mesa não encontrada")
            }

            if (sessions.table_session_closed_at) {
                throw new AppError("Esta mesa já esta fechada")
            }

            await knex<TablesSessionsRepository>("tables_sessions").update({ table_session_closed_at: knex.fn.now() }).where({ table_session_id: id })

            return response.json()
        } catch (error) {
            next(error)
        }
    }
}