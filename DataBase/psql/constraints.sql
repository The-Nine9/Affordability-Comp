-- alter table to add foreign keys, other constraints back in
-- after seeding

-- Already Axists
-- ALTER TABLE Properties
-- ADD CONSTRAINT hoa_key
--   FOREIGN KEY (hoa_key)
--     REFERENCES HOAs (hoa_id);

ALTER TABLE JoinAgentsProperties
ADD CONSTRAINT property_key
  FOREIGN KEY (property_key)
    REFERENCES Properties (property_id);

-- ALTER TABLE JointAgentsProperties
-- ADD CONSTRAINT agent_key
--   FOREIGN KEY (agent_key)
--     REFERENCES Agents (agent_id);

-- ALTER TABLE Appointments
-- ADD CONSTRAINT property_key
--   FOREIGN KEY (property_key)
--     REFERENCES Properties(property_id),

-- ALTER TABLE Appointments
-- ADD CONSTRAINT agent_key
--   FOREIGN KEY (agent_key)
--     REFERENCES Agents(agent_id),

-- ALTER TABLE Appointments
-- ADD CONSTRAINT client_key
--   FOREIGN KEY (client_key)
--     REFERENCES Clients(client_id),

