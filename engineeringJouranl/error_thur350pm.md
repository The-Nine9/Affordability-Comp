2020-12-10 15:46:34.538 PST [6498] ERROR:  insert or update on table "properties" violates foreign key constraint "hoa_key"
2020-12-10 15:46:34.538 PST [6498] DETAIL:  Key (hoa_key)=(-1) is not present in table "hoas".
2020-12-10 15:46:34.538 PST [6498] STATEMENT:  ALTER TABLE Properties
	ADD CONSTRAINT hoa_key
	  FOREIGN KEY (hoa_key)
	    REFERENCES HOAs (hoa_id);
psql:constraints.sql:7: ERROR:  insert or update on table "properties" violates foreign key constraint "hoa_key"
DETAIL:  Key (hoa_key)=(-1) is not present in table "hoas".
2020-12-10 15:46:34.539 PST [6498] ERROR:  relation "jointagentsproperties" does not exist
2020-12-10 15:46:34.539 PST [6498] STATEMENT:  ALTER TABLE JointAgentsProperties
	ADD CONSTRAINT property_key
	  FOREIGN KEY (property_key)
	    REFERENCES Properties (property_id);
psql:constraints.sql:12: ERROR:  relation "jointagentsproperties" does not exist
2020-12-10 15:46:34.539 PST [6498] ERROR:  relation "jointagentsproperties" does not exist
2020-12-10 15:46:34.539 PST [6498] STATEMENT:  ALTER TABLE JointAgentsProperties
	ADD CONSTRAINT agent_key
	  FOREIGN KEY (agent_key)
	    REFERENCES Agents (agent_id);
psql:constraints.sql:17: ERROR:  relation "jointagentsproperties" does not exist
2020-12-10 15:46:34.539 PST [6498] ERROR:  syntax error at or near "TABLE" at character 129
2020-12-10 15:46:34.539 PST [6498] STATEMENT:  ALTER TABLE Appointments
	ADD CONSTRAINT property_key
	  FOREIGN KEY (property_key)
	    REFERENCES Properties(property_id),
	ALTER TABLE Appointments
	ADD CONSTRAINT agent_key
	  FOREIGN KEY (agent_key)
	    REFERENCES Agents(agent_id),
	ALTER TABLE Appointments
	ADD CONSTRAINT client_key
	  FOREIGN KEY (client_key)
	    REFERENCES Clients(client_id),
psql:constraints.sql:32: ERROR:  syntax error at or near "TABLE"
LINE 5: ALTER TABLE Appointments
