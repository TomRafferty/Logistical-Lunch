// Update with your config settings.
require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    debug: true,
    client: "postgresql",
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl : {
        rejectUnauthorized : false,
      },
    },
    migrations : {
      directory : "./db/migrations",
    },
    seeds : {
      directory : "./db/seeds",
    },
  },

};
