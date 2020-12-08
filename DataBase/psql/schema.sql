CREATE DATABASE IF NOT EXISTS mortgage;

DROP TABLE IF EXISTS Properties;
DROP TABLE IF EXISTS HOAs;
DROP TABLE IF EXISTS Agents;
DROP TABLE IF EXISTS JoinAgentsProperties;
DROP TABLE IF EXISTS Appointments;
DROP TABLE IF EXISTS Clients;

CREATE TABLE IF NOT EXISTS Properties (
  property_id SERIAL NOT NULL, PRIMARY KEY(property_id),
  CONSTRAINT hoa_key
    FOREIGN KEY (HOAs)
      REFERENCES hoa_id(HOAs),
  homePrice INTEGER NOT NULL,
  address VARCHAR(50) NOT NULL,
  beds INTEGER NOT NULL,
  baths INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS HOAs (
  hoa_id SERIAL NOT NULL, PRIMARY KEY(hoa_id),
  name VARCHAR(50) NOT NULL,
  fee INTEGER NOT NULL,
);

CREATE TABLE IF NOT EXISTS Agents (
  agent_id SERIAL NOT NULL, PRIMARY KEY(agent_id),
  name VARCHAR(50) NOT NULL,
  title VARCHAR(50) NOT NULL,
  rating INTEGER NOT NULL,
  recentSales INTEGER NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  avatar VARCHAR(50) NOT NULL,
  about VARCHAR(50) NOT NULL,
  agency VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS JoinAgentsProperties (
  id SERIAL NOT NULL, PRIMARY KEY(id),
  CONSTRAINT property_key
    FOREIGN KEY (Properties)
      REFERENCES property_id(Properties),
  CONSTRAINT agent_key
    FOREIGN KEY (Agents)
      REFERENCES agent_id(Agents)
);

CREATE TABLE IF NOT EXISTS Appointments (
  appointment_id SERIAL NOT NULL, PRIMARY KEY(appointment_id),
  CONSTRAINT property_key
    FOREIGN KEY (Properties)
      REFERENCES property_id(Properties),
  CONSTRAINT agent_key
    FOREIGN KEY (Agents)
      REFERENCES agent_id(Agents),
  CONSTRAINT client_key
    FOREIGN KEY (Clients)
      REFERENCES client_id(Clients),
  inPerson BOOLEAN,
  date VARCHAR(50) NOT NULL,
  name VARCHAR(50) NOT NULL,
  financing BOOLEAN NOT NULL,
  zoom VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Clients (
  client_id SERIAL NOT NULL, PRIMARY KEY(client_id),
  name VARCHAR(50) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL
);

