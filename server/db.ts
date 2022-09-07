import knex from "knex";
import configs from "./knexfile";

const env = process.env.NODE_ENV!;

const config = configs[env];

const db = knex(config);

export default db;
