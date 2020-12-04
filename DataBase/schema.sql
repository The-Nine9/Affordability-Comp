CREATE DATABASE IF NOT EXISTS gallery;
-- WITH
--    [OWNER =  admin]
--    [TEMPLATE = template]
--    [ENCODING = encoding]
--    [LC_COLLATE = collate]
--    [ALLOW_CONNECTIONS = true]
--    [CONNECTION LIMIT = -1] -- huhh
--    [IS_TEMPLATE = false ];

DROP TABLE IF EXISTS PropertyPrice;
DROP TABLE IF EXISTS MortgageAgents;
DROP TABLE IF EXISTS MortgageAgentAppointments;

CREATE TABLE IF NOT EXISTS PropertyPrices (
  id SERIAL NOT NULL PRIMARY KEY,
  homePrice INTEGER NOT NULL, -- CHECK ( price > 0 AND price < 1000000000),
);

CREATE TABLE IF NOT EXISTS MortgageAgents (
  name VARCHAR(50) NOT NULL,
  title VARCHAR(50) NOT NULL,
  title VARCHAR(50) NOT NULL,
  rating INTEGER NOT NULL, -- CHECK ( rating > 0 AND rating <= 5),
  recentSales INTEGER NOT NULL, -- CHECK ( recentSales >= 0 AND recentSales <= 1000),
  phone VARCHAR(50) NOT NULL,
  avatar VARCHAR(50) NOT NULL,
  about VARCHAR(50) NOT NULL,
  agency VARCHAR(50) NOT NULL,
);

CREATE TABLE IF NOT EXISTS MortgageAgentAppointments (
  inPerson BOOLEAN,
  date VARCHAR(50) NOT NULL,
  time VARCHAR(50) NOT NULL,
  name VARCHAR(50) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  financing BOOLEAN,
);