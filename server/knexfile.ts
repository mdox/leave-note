import { readFileSync } from "fs";
import type { Knex } from "knex";
import { resolve } from "path";

const client = "postgresql";
const user = "postgres";
const password = () =>
  readFileSync(resolve("./secrets/postgres_password"), "utf-8");

const createConfig = (database: string): Knex.Config => ({
  client,
  connection: {
    database,
    user,
    password,
  },
});

const config: { [key: string]: Knex.Config } = {
  test: createConfig("test"),
  development: createConfig("development"),
  production: createConfig("production"),
};

export default config;
