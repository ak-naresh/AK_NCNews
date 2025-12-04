const { Pool } = require("pg"); //Pool allows handling of multiple queries instead or reconnecting each time)

const pool = new Pool();

const ENV = process.env.NODE_ENV || "development";
const path = `${__dirname}/../.env.${ENV}`;
require("dotenv").config({ path: path });

console.log(process.env.PGDATABASE);

module.exports = pool;
