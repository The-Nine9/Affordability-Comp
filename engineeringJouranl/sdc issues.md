##Issue
	Fully understand the existing DB and its API
###Theory:
	It very likely doesn't have that much
	Q: Only collection is for prices? What about agents + schedules schemas? they're unused schemas?
###Resolution:
	dev mode for webpack
	server/index.js lines about brotlicompression

##Issue
	attempting to run npm start, and i get "sh: nodemon: command not found"
###Theory
	nodemon is not listed as a dependency in package.json
###Resolution
	installed nodemon --> Listening on 

##Issue
	attempting to run npm react-dev, error Algorithm "brotliCompress" is not found in "zlib"
###Theory
	I need to install additional compression libraries
###Resolution?
	Q for Blake?

##Issue
	there is no apparent endpoint which would access the getAll() method from mongoCont, but the perteinent test passes anyways.
###Theory
	I haven't found the endpoint yet
###Resolution

##Issue
	I downloaded + installed postgres from the webstie, but couldn't use common cli commands. I then downloaded postgress with brew, and installed with brew. Now I have the ability to run posgress cli commands, but on attempting to start the postgress service, I am getting an error message that the port is in use by another "postmaster" - the port number 5432 indicates to me that the new, homebrew-installed postgress service is conflicting with the original installation.
###Theory
  I need to kill the existing postgres service.
Actions
	I did sudo rm -r on the postgres directory in /Library.
Result
	It looks like deleting that directory has allowed me to beign postgres with the postgres-init command I added to my bashrc. I'm going to continue working thru the tutorial @ https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/

##Issue
  The data in my csv appears backwards
###Resolution
  Refactoring writeStrings() from a do-while to a for loop fixed this.

##Issue
	The null values for HOA keys aren't printing
###Resolution
	Switched from using null to represent no HOA, to using -1.

##Issue
	After running my properties() csv generation function, I got an error message about the JS heap running out of memory; see "sand/sed error 545am". Running the script with 1/100th the amount of records attempted resulted in success.
###Theory
	I am attempting to do so much computing work, that my system can't handle it.
	I could increase the memory limit. 1.7GB standard?
	@ https://stackoverflow.com/questions/38558989/node-js-heap-out-of-memory
  Set node environment variable
  $ node --max-old-space-size=4096 yourFile.js // this is 4gb, and was not enough
  $ node --max-old-space-size=7168 yourFile.js // try 7gb, still ran out
###Resolution
	Signifigant refactoring with the team! 

##Issue
	DataBase/psql/csvMaker.psql.js does not appear in git, at all!
###Theory
	It has been gitignored somehow (negative!)
###Resolution
	An attempt to get the file un-ignored by renmaing it revealed that git was tracking it, as it was recognized as a "deleted" file.
	I must have already commited all the recent changes? It's possible. I haven't been working on it for a while. ---> confirmed this by trying chaning a comment. It's up-to-date!

##Issue
	Some of my .csv files include the delimmitter character ","
###Theory
	I can write a helper function to eliminate commas from strings
###Resolution?
	I the helper function and attached it to to strings generated in my csv generator. It's cooking files now, we'll see if I get any errors when I go to copy csvs over into the db.

##Issue
	Seeding my postgress db with my .csv files
###Theory
	Either (a) seed with a script, or (b) use a psql-cli command
###Resolution?
	Try (b) ---> @ https://www.postgresql.org/docs/9.2/sql-copy.html
	=> COPY table_name [column name, column name]
			FROM 

##Issue
	When copying from csv into my postgres db from the psql-cli, I encountered this data type error:
		mortgage=# COPY agents FROM '/Users/thomasbrannan/Desktop/hackReactor/SDC/Affordability-Comp/DataBase/psql/data/agents.csv';
		ERROR:  invalid input syntax for type integer: "name, title, rating, recentSales, phone, email, avatar, about, agency"
		CONTEXT:  COPY agents, line 1, column agent_id: "name, title, rating, recentSales, phone, email, avatar, about, agency"
	This looks like and ##Issue with the agent_id field not auto-incrementing as I thought it would; notice that I do not insert on that field.
###Theory
	a) modify my csv generators to insert on the id fields
	b) modify my psql schema to work the way I originally wanted it to
###Resolution?
	Got an answer from Blake; persuing route (b) by modifying primary key declarations
		Wrong: client_id SERIAL NOT NULL, PRIMARY KEY(client_id),
		Right: client_id SERIAL PRIMARY KEY,
	After taking those actions, I recieved the same error.	
	Relevant Q @
		https://stackoverflow.com/questions/36368496/pg-copy-error-invalid-input-syntax-for-integer-when-importing-quoted-csv-file
	Specify the columns... 
		COPY agents (name, title, rating, recentSales, phone, email, avatar, about, agency) FROM '/Users/thomasbrannan/Desktop/hackReactor/SDC/Affordability-Comp/DataBase/psql/data/agents.csv';

##Issue
	Error: varchar size limits! Trying making every varchar 280 chars long (a tweet). Q
		@ stackoverflow.com/questions/25593338/how-to-import-tables-with-missing-values
###Theory:
		Try adding an explicit delimiter to my query: maybe it doesn't recognize the columns in my csv, since it doesn't know to split on the ","?
			COPY agents (name, title, rating, recentSales, phone, email, avatar, about, agency) FROM '/Users/thomasbrannan/Desktop/hackReactor/SDC/Affordability-Comp/DataBase/psql/data/agents.csv' WITH DELIMITER ',';
		I have a space added to my columns in the header
			ERROR:  invalid input syntax for type integer: " rating"
			CONTEXT:  COPY agents, line 1, column rating: " rating"
		--> try eliminating spaces from query?
###Resolution:
	Sean+Blake suggest CSV HEADER, also using WITH is optional:
		COPY agents (name,title,rating,recentSales,phone,email,avatar,about,agency) FROM '/Users/thomasbrannan/Desktop/hackReactor/SDC/Affordability-Comp/DataBase/psql/data/agents.csv' DELIMITER ',' CSV HEADER;
	the error would make sense if it’s perceiving the csv header as data, i.e. putting the string from the header into the integer field.

##Issue
	Attempted to run $node seed.psql.js.
	Got a very long error message: see "error_wed_610pm"
	"ERROR: must be a superuser or...", for all six tables
###Theory:
	Add role to the seeder user
###Resolution:
	Use psql cli ALTER ROLE
		a) make seeder a superuser? --> go for it
		b) give seeder limited privilege? --> may be complicated
	-# ALTER ROLE 
	--> superuser privilege for seeder got that fixed.

##Issue
	My .json files are a bit messed up; I need each object to have its own key, or for all the objects to be collected in a big array (which would have to be parsed thru by the seeding script).
###Theory
	a) manually edit the .json files to put the objects into an array. This would mean changing the first and last lines. I would then re-seed mongodb.
	b) rework the json generation script to put a key on each object, then re-seed.
###Resolution:
	MongoDB import guide @ https://docs.mongodb.com/guides/server/import/
	MongoDB reference import data @ https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/inventory.crud.json
	Added a key "i" to both generators. --> I think this is wrong, based on the reference data. What it looks like I need to do is to drop the header and tail "{", "}". Reference is just a new object on each line.
	I would like to not regenerate the entire 2 x 10M line json files just because of a couple mustache braces, so I'm looking into using $sed @
			https://stackoverflow.com/questions/50612417/remove-first-character-of-a-text-file-from-shell
		Original:	sed '1s/^.//' startfile > endfile # match first line in susbstitution mode, at end of line match any char, replace with nothing
		Edited: sed '1s/^{//' startfile > endfile # this KILLED my json file, lol
		New Approach: changed the jsonMaker to ommit head and tail braces, regenerating...

##Issue
	About to try import .json data to mongo db
	Getting errors
###Theory
	command @ https://docs.mongodb.com/guides/server/import/
	default
		mongoimport --db test --collection inventory \
	       --authenticationDatabase admin --username <user> --password <password> \
	       --drop --file ~/Downloads/inventory.crud.json
  edits
		mongoimport --db mortgage --collection properties --drop --file /Users/thomasbrannan/Desktop/hackReactor/SDC/Affordability-Comp/DataBase/mongo/data/properties.json
	error:
		> mongoimport --db mortgage --collection properties --drop --file /Users/thomasbrannan/Desktop/hackReactor/SDC/Affordability-Comp/DataBase/mongo/data/properties.json
		uncaught exception: SyntaxError: unexpected token: identifier :
		@(shell):1:14
	Maybe this error is because I need to set up the db and its collections before seeding it? I had assumed that mongo would create them as I go.
	> use mortgage # created mortgage db
	> db.createCollection("properties") # created properties collection
	... try running the command again, as above:
	Same error!
	Q @ https://stackoverflow.com/questions/31314544/mongoimport-syntaxerror-unexpected-identifier
	I need to use the command from bash, not mongo-cli!!!
	error:
		{mongo} $mongoimport --db mortgage --collection properties --drop --file /Users/thomasbrannan/Desktop/hackReactor/SDC/Affordability-Comp/DataBase/mongo/data/properties.json
		2020-12-10T11:41:42.772-0800	connected to: mongodb://localhost/
		2020-12-10T11:41:42.774-0800	dropping: mortgage.properties
		2020-12-10T11:41:42.843-0800	Failed: error processing document #2: invalid character ',' looking for beginning of value
		2020-12-10T11:41:42.843-0800	0 document(s) imported successfully. 0 document(s) failed to import.
	Commas in between the objects are no good ---> regenerate json!! Work with a smaller document for now.
	After eliminating commas, reducing count to 10: 10 documents imported successfully!
	commands:
		mongoimport --db mortgage --collection properties --drop --file /Users/thomasbrannan/Desktop/hackReactor/SDC/Affordability-Comp/DataBase/mongo/data/properties.json
		mongoimport --db mortgage --collection agents --drop --file /Users/thomasbrannan/Desktop/hackReactor/SDC/Affordability-Comp/DataBase/mongo/data/agents.json
	Observation:
		It's a much better idea to try the complete process from generation to seeding before I generate any huge files.

##Issue
	Attempting to run my constraint script on postgres, I encountered the error in error_thur350pm

##Issue
	Attempting to use GET "/mortgageAPI/agent/:name", and I get this error:
		CastError: Cast to string failed for value "{ name: 'Mack Bradtke' }" at path "name" for model "Agent"
	In server/index.js, I am passing the req paramater "Mack%20Bradtke" and using String.prototype.replace() to interpolate the whitespace.
  The value which is arriving at DataBase/mongo/controllers/agent.js is an Object, and not a string.
		In agent.js: name is [object Object] <object>
		stringified name: {"name":"Mack Bradtke"}
###Resolution:
	From server/index.js, I was erronously passing the name inside of an anonymous object literal.

##Issue
	In writing queries to mongo-cli, I want to create a document that has an array of foreign keys. And, if any of the keys in that array don’t match to a document in their particular collection, I want to insert a document in there.
	5:09
	Here’s my pseudocode of how I see this working:
		POST
			Receive all data for a property + any associated agents
			Create the property document
			Find any existing agents who match those in the post
			Create any agents who are not in the post
			Associate the property with the agents
	POST because there would ultimately be a server endpoint to access these queries… for now, I’d like to get one on the mongo cli
	5:10
	I would be expecting to receive a request body with json for the property including an array of its associated agents, as well as json for any new agents who are associated with this new property (i.e., the agents in the property array may or may not exist in the agents collection at the time of the query) (edited) 

##Issue
	Incomplete response from GET "/mortgageAPI/main/:property_id"
	What I want: json with keys property--><Object> and agents---><Array of Objects>
	What I get: property object is ok, but the agents array is empty
###Theory
	...The endpoint routes to DataBase/mongo/controllers/join.js::readAll(). Console logging from readAll, I can see an agent object in the agents array at the time it is pushed to the array. Attempting to console log the agents array right before the callback should send it back to server/index.js results in the server hanging up.
	...This may be related to the use of awaiting an anonymous, asynchronous callback argument passed to Array.prototype.forEach, used to recieve agent IDs from the property object, to use those IDs to query the Agents collection in mongoDB, and push the resulting docs to the agents array.
	...A relevant stacoverflow @
		https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
	This may be related to those Unhandled Promise Rejections...
###A&R
	My original forEach loop did not resolve promises
  	property.agents.forEach(async function(agent_id) {
  	  agent = await Agent.findOne({agent_id});
  	  agents.push(agent);
  	});
  I refactored according to the stackoverflow, await Promise.all:
    agents = await Promise.all(property.agents.map(async (agent_id) => {
      return await Agent.findOne({agent_id});
    }));

##Issue
	While importing agents.json (~15GB) to MongoDB on EC-2, the mongoimport tool has been stuck at 46.2% for over 10 minutes. 
###Theory
	a) just be patient --> it's been long enough.
	b) decrease batch size
	c) numinsertionworkers
	StackOverFlow @ 
		stackoverflow.com/questions/33315243/mongoimport-stuck-at-same-point-while-importing-a-json-file
	d) my file system is full? Can't save a .sh file with vim. Currently using 29.9/30GB!
	agents.json is about 15GB, if it could delete itself as it loads into mongo, maybe that would fix this?
###A&R
	Spend $$$ to fix the problem quickly!
	AWS Docs "How do I expand the Amazon EBS root volume of my Amazon EC2 Linux instance?"@
		https://aws.amazon.com/premiumsupport/knowledge-center/expand-root-ebs-linux/
	[ X ] Request Modification to my EBS volume @
		https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/requesting-ebs-volume-modifications.html

##Issue
	While trying to start nodemon on an ec-2 instance, recieved an "address already in use" error.
###A&R
	Read stackoverflow ---> killed the process on the conflicted port, and nodemon started then.










