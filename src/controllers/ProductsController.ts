import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import { z } from "zod"
import { AppError } from "@/utils/AppError";

export class ProductsController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const { product_name } = request.query

            const products = await knex<ProductsRepository>("products").select().whereLike("product_name", `%${product_name ?? ""}%`).orderBy("product_id")
            

            return response.json(products)
        } catch (error) {
            next(error)
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                product_name: z.string().trim().min(6),
                product_price: z.number().gt(0)
            })

            const { product_name, product_price } = bodySchema.parse(request.body)
            await knex<ProductsRepository>("products").insert({ product_name, product_price })

            return response.status(201).json()
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const product_id = z.string().transform((value) => Number(value)).refine((value) => !isNaN(value), { message: "o id deve ser um número"}).parse(request.params.id)

            const bodySchema = z.object({
                product_name: z.string().trim().min(6),
                product_price: z.number().gt(0)
            }) 

            const { product_name, product_price} = bodySchema.parse(request.body)

            await knex<ProductsRepository>("products").update({product_name, product_price, product_updated_at: knex.fn.now()}).where("product_id", product_id)

            const product = await knex<ProductsRepository>("products").select().where("product_id", product_id).first()

            if(!product) {
                throw new AppError("Produto não encontrado")
            }

            return response.json({ message: "update" })
        } catch (error) {
            next(error)
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const product_id = z.string().transform((value) => Number(value)).refine((value) => !isNaN(value), { message: "o id deve ser um número"}).parse(request.params.id)

            const product = await knex<ProductsRepository>("products").select().where("product_id", product_id).first()

            if(!product) {
                throw new AppError("Produto não encontrado")
            }

            await knex<ProductsRepository>("products").delete().where("product_id", product_id)

            return response.json()
        } catch (error) {
            next(error)
        }
    }
}