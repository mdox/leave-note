import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("notes", (table) => {
    table.increments("id");
    table.string("title").defaultTo("");
    table.text("content").defaultTo("");
    table
      .timestamp("created_at", { useTz: true, precision: 6 })
      .defaultTo(knex.fn.now(6));
    table
      .timestamp("updated_at", { useTz: true, precision: 6 })
      .defaultTo(knex.fn.now(6));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("notes");
}
