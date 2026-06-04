import { table } from "console";
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("products", (table) => {
        table.increments("product_id").primary()
        table.text("product_name").notNullable()
        table.decimal("product_price").notNullable()
        table.timestamp("product_created_at").defaultTo(knex.fn.now())
        table.timestamp("product_updated_at").defaultTo(knex.fn.now())

    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("products")
}

