DROP TABLE IF EXISTS Properties;
DROP TABLE IF EXISTS HOAs;
DROP TABLE IF EXISTS Agents;
DROP TABLE IF EXISTS JoinAgentsProperties;
DROP TABLE IF EXISTS Appointments;
DROP TABLE IF EXISTS Clients;

CREATE TABLE IF NOT EXISTS Properties (
  property_id SERIAL PRIMARY KEY,
  -- CONSTRAINT hoa_key
  --   FOREIGN KEY (HOAs)
  --     REFERENCES hoa_id(HOAs),
  hoa_key INTEGER NOT NULL,
  homePrice INTEGER NOT NULL,
  address VARCHAR(280) NOT NULL,
  beds INTEGER NOT NULL,
  baths INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS HOAs (
  hoa_id SERIAL PRIMARY KEY,
  name VARCHAR(280) NOT NULL,
  fee INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS Agents (
  agent_id SERIAL PRIMARY KEY,
  name VARCHAR(280) NOT NULL,
  title VARCHAR(280) NOT NULL,
  rating INTEGER NOT NULL,
  recentSales INTEGER NOT NULL,
  phone VARCHAR(280) NOT NULL,
  email VARCHAR(280) NOT NULL,
  avatar VARCHAR(280) NOT NULL,
  about VARCHAR(280) NOT NULL,
  agency VARCHAR(280) NOT NULL
);

CREATE TABLE IF NOT EXISTS JoinAgentsProperties (
  id SERIAL PRIMARY KEY,
  -- CONSTRAINT property_key
  --   FOREIGN KEY (Properties)
  --     REFERENCES property_id(Properties),
  -- CONSTRAINT agent_key
  --   FOREIGN KEY (Agents)
  --     REFERENCES agent_id(Agents)
  property_key INTEGER NOT NULL,
  agent_key INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS Appointments (
  appointment_id SERIAL PRIMARY KEY,
  -- CONSTRAINT property_key
  --   FOREIGN KEY (Properties)
  --     REFERENCES property_id(Properties),
  -- CONSTRAINT agent_key
  --   FOREIGN KEY (Agents)
  --     REFERENCES agent_id(Agents),
  -- CONSTRAINT client_key
  --   FOREIGN KEY (Clients)
  --     REFERENCES client_id(Clients),
  property_key INTEGER NOT NULL,
  agent_key INTEGER NOT NULL,
  client_key INTEGER NOT NULL,
  inPerson BOOLEAN,
  date VARCHAR(280) NOT NULL,
  name VARCHAR(280) NOT NULL,
  financing BOOLEAN NOT NULL,
  zoom VARCHAR(280) NOT NULL
);

CREATE TABLE IF NOT EXISTS Clients (
  client_id SERIAL PRIMARY KEY,
  name VARCHAR(280) NOT NULL,
  phone VARCHAR(280) NOT NULL,
  email VARCHAR(280) NOT NULL
);
