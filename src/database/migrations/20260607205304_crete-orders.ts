import { table } from "console";
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("orders", (table) => {
        table.increments("order_id").primary()
        table.integer("table_session_id").notNullable().references("table_session_id").inTable("tables_sessions")
        table.integer("product_id").notNullable().references("product_id").inTable("products")
        table.integer("quantity").notNullable()
        table.decimal("price").notNullable()
        table.timestamp("order_created_at").defaultTo(knex.fn.now)
        table.timestamp("order_updated_at").defaultTo(knex.fn.now)
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("orders")
}

