### Legend
	[   ]	Task
	[ ! ] Submit to tracker
	[ X ] Completed ask
	[ * ] In-progess task
	[ ? ] Task awaits answer
	(   ) Option
	( X ) Chosen option
	[...]	Tech Debt

### SDC Tracker

##Parts 3a + 3b
	[ X ] Build out CRUD API
	[ X ] Primary Database Chosen
	[ X ] Secondary Database Chosen
	[ X ] Receive TM or Shep approval for API & Schema
	[ X ] Data generation script
	[ X ] One or more core db queries + sample results
	[ X ] Pull Request that you have Code Reviewed
	[ X ] Query execution time with 10M records in DB. (primary)
	[ X ] Query execution time with 10M records in DB. (secondary)
	[ X ] Final DB decision

##Midpoint Conversation
	[ X ] Midpoint Conversation Notes
	[ X ] Midpoint Conversation Video

##Part 3c
	[ X ]	Show the New Relic dashboard displaying your service's metrics during a stress test (in development)
	[   ]	Service RPS (in development) with setup/config details and sample results

##Part 4
	[   ] My service running on EC2
	[   ] Show the New Relic dashboard displaying your service's metrics during a stress test (on EC2)
	[   ] My proxy running on EC2	Show the New Relic dashboard displaying your proxy's metrics during a stress test (on EC2)
	[   ] RPS for proxy (on EC2) with setup/config details and sample results
	[   ] Improved RPS for proxy (on EC2) with setup/config details and sample results

### SDC Timeline

## High-Level
	[ X ] Select app and services
	[ X ] Update the API to be fully CRUD capable
	[ X ] Choose 2 databases you haven’t used already (one SQL, one no-SQL)
	[ X ] Generate 10m records and efficiently load into each database (db)
	[ X ] Performance tune and benchmark test the queries for 2 db options 
	[ X ] Choose one db to move forward with
	[ X ] Stress test in development env. and report metrics from New Relic dashboard
	[ * ] Deploy to AWS
	[   ] Stress test deployed service and report metrics from New Relic dashboard
	[   ] Attempt to scale to 10k rps

## More Detail

	[ X ] Select app and services

	[ X ] Update the API to be fully CRUD capable
		[ X ] Create a CRUD api to support the existing codebase 
		[ X ] Update API with schema changes

	[ X ] Choose 2 databases, and build out the schema for each of them
		[ X ] PostgresSQL
		[ X ] MongoDB
		[ X ] API + Schema approved by Susan

	[ X ] Install PostgresSQL
		[ X ] Notes on basic commands are in hackreactor/sdc/notes_postgress

	[ X ] Generate 10m records and efficiently load into each db
		[ X ] Generate csv for postgres
		[ X ] Write csv header
		[ X ] Write dummy data to loop thru (generator functions --> strings)
		[ X ] Use fs to write .csv files 
		[ X ] Generate JSON for mongo
		[ X ] Use .csv files to seed postgres
			[ X ] Add .csv data to a postgres table from the psql-cli
			[ X ] Write a script to seed postgres
				[ X ] Connect the script to the db
				[ X ] Write each COPY query
		[ X ] Use .json files to seed mongo
			[ X ] Seeded small amounts of data
			[ X ] Seed the full 2x 10M dataset
			[ ? ] Refactor the data's absolute path names to relative path names

	[ X ] Performance tune and benchmark test the queries for 2 db options 
		[ X ] Write all queries used by the API for mongo + postgres
			[ X ] Test mongo queries on cli
				[ X ] exectue GET
				[ X ] analyze GET
				[ X ] execute POST
				[ X ] analyze POST
			[ X ] Test psql queries on cli
				[ X ] exectue GET
				[ X ] analyze GET
				[ X ] execute POST
				[ X ] analyze POST
		[ X ] Measure query times
				[ X ] Alter the tables with index for BFS search
				[ X ] Verify that all queries run in under 50ms

	[ X ] Choose one db to move forward with
	  	[ X ] SDC DB Choice Template
	  		[ X ] Consistency vs. Availability
	  		[ X ] Read speed
	  		[ X ] DB size in memory
	  			[ X ] Mongo: db.runCommand({dbStats: 1, scale: 1000000000});
	  			[ X ] PSQL: SELECT pg_size_pretty( pg_database_size('mortgage') );
		  	[ X ] Implement server endpoints to query that db

	[ X ] Midpoint Conversation Video

	[ X ] Build out routes
		[ X ] GET
		[ X ] POST

	[ X ] Seed Mongo on EC-2
		[ X ] scp transfer data to ec2
		[ X ] Import properties.json
		[ X ] Decompress agents.tar.gz
		[ X ] Import agents.json
	[ X ] MongoDB and Express running on seperate servers
	[ X ] Service running on EC-2
	[ X ] K6 + New Relic for Local Stress Testing
		[ X ] Install k6 // runs stress test
		[ X ] Install New Relic // provides data
		[ X ] Stress test GET on k6
	[ * ] Deploy to EC-2
	  [ X ] Goto the IPV4 service url and interact w/ my serivce
	  [ * ] Load balance with NGINX
	[   ] Loader.IO
		[   ] Install Loader.IO
		[   ] Stress test online performance
  [   ] Find Bottleneck
  	[   ] It's *probably* Node.js ---> go NGINX create mutliple Node EC-2 Instances


## Grading
	Passing
	  [   ] Fully Deployed + Stress Test
	Excel
	  [   ] Optimized






















