from bash:
	psql postgres #Connect to the database 'postgres' (can make others)

get ifno in psql cli:
	\conninfo # check port number, and more
	\q #exit psql clit
	\c #connect to a new db
	\dt #show all relations
	\du #show all 'roles' (users and what they can do)
	\list #show all databases
	show data_directory; // where is data located?
	SELECT COUNT(*) FROM table [WHERE condition];

change user roles:
	CREATE ROLE uname WITH LOGIN PASSWORD 'somepasswd';
	DROP ROLE uname;
	ALTER ROLE uname CREATEDB; #let uname make new dbs

modify a table, useful for adding constraints after seeding,
seeding a table with constraints is slower
	@ https://www.postgresqltutorial.com/postgresql-foreign-key/
	ALTER TABLE child_table 
		ADD CONSTRAINT constraint_name 
			FOREIGN KEY (fk_columns) 
				REFERENCES parent_table (parent_key_columns);
Check that a constraint is valid
	ALTER TABLE distributors VALIDATE CONSTRAINT distfk;
	

cli prompts:
	[state][user]
	=#	superuser has a #
	=>	nonsuperuser has a >
	-#	superuser did not end last cmd w/ ;
	->	nonsuperuser did not end last cmd w/ ;

making dbs
	CREATE DATABASE dbname; #make a new db
	\c dbname; #connect to the new db

npm pg for node.js:
	// @ npmjs.com/package/pg
	// @ node-postgres.com/
	// package.json <--- $npm install pg
	const Pool = require('pg').Pool;
	const pool = new Pool({
		user: String // "thomasbrannan"
		host: String // "localholst"
		database: String	// "SDC-Mortgages"
		password: String
		port: Number // 5432
	});
	// query db with pool.query(string, numebredPlaceholders, (err, res) => {...})
	// @ https://node-postgres.com/api/pool#poolquery

Postgres numbered placeholders:
	pool.query's second parmater is an optional array which will map to numbered placeholders to be used in the query string. the first element of the array should be accessed as $1 in the query string, and the nth element is $n. Q: test out using template literals instead of numbered placeholders; it seems better?
	  pool.query(
	    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
	    [name, email, id],
	    (error, results) => { /* error first, "user modified" message */ }
	  )
	}

Running a psql script
  $ psql -f <fileName>

Get time of a query
	postgres explain analyze







