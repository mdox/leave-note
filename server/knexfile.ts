import { readFileSync } from "fs";
import type { Knex } from "knex";
import { resolve } from "path";

const createConfig = (database: string): Knex.Config => ({
  client: "postgresql",
  connection: {
    port: 7621,
    database,
    user: "postgres",
    password: () =>
      readFileSync(resolve("./secrets/postgres_password"), "utf-8"),
  },
});

const config: { [key: string]: Knex.Config } = {
  test: createConfig("test"),
  development: createConfig("development"),
  production: createConfig("production"),
};

export default config;
