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
                product_quantity: z.number()
            })

            const { table_session_id, product_id, product_quantity } = bodySchema.parse(request.body)

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
                product_price: product.product_price,
                product_quantity: product_quantity,
                order_price: product.product_price * product_quantity
            })

            return response.status(201).json(product)
        } catch (error) {
            next(error)
        }
    }

    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const { table_session_id } = request.params

            const orders = await knex("orders")
            .select(
                "orders.order_id", 
                "orders.table_session_id",
                "orders.product_id",
                "products.product_name",
                "orders.product_price", 
                "orders.product_quantity", 
                "orders.order_price",
                "orders.order_created_at",
                "orders.order_updated_at"
            ).join("products", "products.product_id", "orders.product_id").where({ table_session_id: table_session_id }).orderBy("orders.order_created_at", "desc")

            return response.json(orders)
        } catch (error) {
            next(error)
        }
    }

    async show(request: Request, response: Response, next: NextFunction) {
        try {
            const { table_session_id } = request.params

            const order = await knex("orders").select(knex.raw("COALESCE(SUM(order_price), 0) AS total"), knex.raw("COALESCE(SUM(product_quantity), 0) AS products_quantity")).where({ table_session_id: table_session_id}).first()


            return response.json(order)
        } catch (error) {
            next(error)
        }
    }
}