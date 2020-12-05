CREATE DATABASE IF NOT EXISTS mortgage;
-- WITH
--    [OWNER =  admin]
--    [TEMPLATE = template]
--    [ENCODING = encoding]
--    [LC_COLLATE = collate]
--    [ALLOW_CONNECTIONS = true]
--    [CONNECTION LIMIT = -1] -- huhh
--    [IS_TEMPLATE = false ];

DROP TABLE IF EXISTS Properties;
DROP TABLE IF EXISTS Agents;
DROP TABLE IF EXISTS Appointments;

CREATE TABLE IF NOT EXISTS Properties (
  property_id SERIAL NOT NULL PRIMARY KEY,
  PRIMARY KEY(property_id),
  homePrice INTEGER NOT NULL -- CHECK ( price > 0 AND price < 1000000000)
);

CREATE TABLE IF NOT EXISTS Agents (
  agent_id SERIAL NOT NULL,
  PRIMARY KEY(agent_id),
  name VARCHAR(50) NOT NULL,
  title VARCHAR(50) NOT NULL,
  rating INTEGER NOT NULL, -- CHECK ( rating > 0 AND rating <= 5),
  recentSales INTEGER NOT NULL, -- CHECK ( recentSales >= 0 AND recentSales <= 1000),
  phone VARCHAR(50) NOT NULL,
  avatar VARCHAR(50) NOT NULL,
  about VARCHAR(50) NOT NULL,
  agency VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Appointments (
  CONSTRAINT agent_key
    FOREIGN KEY (Properties)
      REFERENCES property_id(Properties),
  CONSTRAINT agent_key
    FOREIGN KEY (Agents)
      REFERENCES agent_id(Agents),
  inPerson BOOLEAN,
  date VARCHAR(50) NOT NULL,
  time VARCHAR(50) NOT NULL,
  name VARCHAR(50) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  financing BOOLEAN
);
