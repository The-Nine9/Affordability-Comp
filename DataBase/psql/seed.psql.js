// @ https://node-postgres.com/features/connecting

const { Pool, Client } = require('pg');

const pool = new Pool({
  user: "seeder",
  host: "localhost",
  database: "mortgage",
  password: "sdc",
  port: 5432,
})
pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res)
  pool.end()
})
const client = new Client({
  user: "dbuser",
  host: "database.server.com",
  database: "mydb",
  password: "secretpassword",
  port: 3211,
})
client.connect()
client.query("SELECT NOW()", (err, res) => {
  console.log(err, res)
  client.end()
})

const getQueryToCopy = function(target) {
  if (target === "agents") {
    return "COPY agents (name, title, rating, recentSales, phone, email, avatar, about, agency) FROM '/Users/thomasbrannan/Desktop/hackReactor/SDC/Affordability-Comp/DataBase/psql/data/agents.csv' DELIMITER ',' CSV HEADER";
  }
  // todo: more targets
};
