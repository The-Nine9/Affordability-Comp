// @ https://node-postgres.com/features/connecting

const { Pool, Client } = require('pg');

const pool = new Pool({ // url @ postgresql://localhost:5432
  user: "seeder",
  host: "localhost",
  database: "mortgage",
  password: "sdc",
  port: 5432
});

const queries = {
  // properties: "COPY properties (hoa_key, homePrice, address, beds, baths) FROM '/Users/thomasbrannan/Desktop/hackReactor/SDC/Affordability-Comp/DataBase/psql/data/properties.csv' DELIMITER ',' CSV HEADER",

  // hoas: "COPY hoas (name, fee) FROM '/Users/thomasbrannan/Desktop/hackReactor/SDC/Affordability-Comp/DataBase/psql/data/hoas.csv' DELIMITER ',' CSV HEADER",

  // agents: "COPY agents (name, title, rating, recentSales, phone, email, avatar, about, agency) FROM '/Users/thomasbrannan/Desktop/hackReactor/SDC/Affordability-Comp/DataBase/psql/data/agents.csv' DELIMITER ',' CSV HEADER",

  // joinAgentsProperties: "COPY joinAgentsProperties (property_key, agent_key) FROM '/Users/thomasbrannan/Desktop/hackReactor/SDC/Affordability-Comp/DataBase/psql/data/joinAgentsProperties.csv' DELIMITER ',' CSV HEADER",

  // appointments: "COPY appointments (property_key, agent_key, client_key, inPerson, date, name, financing, zoom) FROM '/Users/thomasbrannan/Desktop/hackReactor/SDC/Affordability-Comp/DataBase/psql/data/appointments.csv' DELIMITER ',' CSV HEADER",

  // clients: "COPY clients (name, phone, email) FROM '/Users/thomasbrannan/Desktop/hackReactor/SDC/Affordability-Comp/DataBase/psql/data/clients.csv' DELIMITER ',' CSV HEADER",
};

// pool.query("SELECT NOW()", (err, res) => {
//   console.log(err, res),
//   pool.end()
// });

Object.keys(queries).forEach(table => pool.query(queries[table], (err, res) => {
  console.log(`Completed ${table}`);
  console.log(err, res);
}));
pool.end();
