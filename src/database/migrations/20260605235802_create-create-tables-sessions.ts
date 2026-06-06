import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("tables_sessions", (table) => {
        table.increments("table_session_id").primary()
        table.integer("table_id").notNullable().references("table_id").inTable("tables")
        table.timestamp("table_session_opened_at").defaultTo(knex.fn.now())
        table.timestamp("table_session_closed_at")
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("tables_sessions")
}

