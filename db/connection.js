const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";
const path = `${__dirname}/../.env.${ENV}`;
require("dotenv").config({ path: path });

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

console.log(process.env.PGDATABASE);

const config = {};

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

module.exports = new Pool(config);
