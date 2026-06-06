import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("tables", (table) => {
        table.increments("table_id").primary(),
        table.integer("table_number").notNullable(),
        table.timestamp("table_crated_at").defaultTo(knex.fn.now()),
        table.timestamp("table_updated_at").defaultTo(knex.fn.now())

    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("tables")
}

