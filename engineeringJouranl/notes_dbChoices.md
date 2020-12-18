Types of databases
	Relational dbs (SQL)
	Document dbs (mongo)
	Graph dbs
	Key-value dbs (redis)

db transaction = 
	dbs with transactional integrity ensure that if any part of a transaction fails, the entire transaction fails.
	transactional integrity is a component of ACID = atomic (all or none of transaction), consistent (complies with restrictions), isolated (it will not affect other transactions), and durable (written to persistent storage).
	implementing transactional integrity and ACID make dbs slower and more difficult to work with. but, they will be more reliable.

mongodb has no schemas. mongoose does.

When to use what?
	use case, data shape, scale
	search dbs --> document store w/ search optimization
	heterogeneious data --> document store
	social graphs --> possibly a graph dbs, these are new
	bussiness --> relational databases
	geospatial --> any dbs

NoSQL dbs:
	No joins, no transactions,

Connection Pools:
	@ https://en.wikipedia.org/wiki/Connection_pool
	const { Pool } = require("pg")
	@ https://github.com/The-Nine9/Main-Gallery/blob/26a928203bdd928b3f0a0ff352a59e85320f3b8d/PostgreSQL/seed.jsloo


Scaling the DB:

Vertical Scaling			Making the machine badder
Horizontal Scaling		Adding more machines

Mongo supports horizontal scaling through Sharding @ https://docs.mongodb.com/manual/sharding/
















