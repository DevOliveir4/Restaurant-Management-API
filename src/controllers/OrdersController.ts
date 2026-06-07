import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import { z } from "zod"
import { AppError } from "@/utils/AppError";
import { OrdersRepository } from "@/database/types/ordersRepository";

export class OrdersController {
    async create(request: Request, response: Response, next: NextFunction){
        try {
            const bodySchema = z.object({
                table_session_id: z.number(),
                product_id: z.number(),
                order_product_quantity: z.number()
            })

            const { table_session_id, product_id, order_product_quantity } = bodySchema.parse(request.body)

            const session = await knex<TablesSessionsRepository>("tables_sessions").select().where({ table_session_id: table_session_id }).first()
            
            if(!session) {
                throw new AppError("Esta mesa não existe")
            }

            if(session.table_session_closed_at) {
                throw new AppError("Esta mesa já esta fechda")
            }

            const product = await knex<ProductsRepository>("products").select().where({ product_id: product_id}).first()

            if(!product) {
                throw new AppError("Este produto não existe")
            }

            await knex<OrdersRepository>("orders").insert({
                table_session_id: table_session_id,
                product_id: product_id,
                order_product_quantity: order_product_quantity,
                order_price: product.product_price * order_product_quantity
            })

            

            return response.status(201).json(product)
        } catch (error) {
            next(error)
        }
    }
}