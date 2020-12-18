## PRIMARY ENDPOINTS
	m[   ] p[   ] POST "/mortageAPI/property/all"
	m[ X ] p[   ] GET "/mortageAPI/property/:id/all"

## PRIMARY QUERIES

mongodb

	POST
		Receive all data for a property + any associated agents
		Create the property document
		Find any existing agents who match those in the post
		Create any agents who are not in the post
		Associate the property with the agents

		db.property.aggregate([
			{$match: {property_id: 1234567}},
			{}
		])

	GET
		Find the property document
		Find all the agents associated with the property
		Return all that data

		db.properties.aggregate([
			{ $match: { property_id: 1234567 } },
			{ $lookup: {
					from: "agents",
					localField: "agents",
					foreignField: "agent_id",
					as: "agents"
			} }
		])

		to explain aggregate query: db.properties.explain("executionStats").aggregate([....])

		db.properties.aggregate([ { $match: { property_id: 1234567 } }, { $lookup: { from: "agents", localField: "agents", foreignField: "agent_id", as: "agents"} }]);


postgres
	POST

	--from bash, run:
	--$ psql mortgage -x -f querytest.sql

	SELECT p.*,
	  JSON_AGG(
	  	JSON_BUILD_OBJECT(
	      'agent_id', a.agent_id,
			  'name', a.name,
			  'title', a.title,
			  'rating', a.rating,
			  'recentSales', a.recentSales,
			  'phone', a.phone,
			  'email', a.email,
			  'avatar', a.avatar,
			  'about', a.about,
			  'agency', a.agency
			)
		)
	FROM Properties p
	JOIN JoinAgentsProperties jap
	  ON (p.property_id=jap.property_key)
	JOIN Agents a
		ON (jap.agent_key=a.agent_id)
	WHERE (p.property_id=1234467)
	GROUP BY (p.property_id);

## SECONDARY ENDPOINTS REFERENCE
	m[ X ] p[   ] POST "/mortgageAPI/property"
	m[ X ] p[   ] GET "/mortgageAPI/property/:id"
	m[ X ] p[   ] PATCH "/mortgageAPI/property/:id"
	m[ X ] p[   ] DELETE "/mortgageAPI/property/:id"
	m[ X ] p[   ] POST "/mortgageAPI/agent/:id"
	m[ X ] p[   ] GET "/mortgageAPI/agent/:id"
	m[ X ] p[   ] PATCH "/mortgageAPI/agent/:id"
	m[ X ] p[   ] DELETE "/mortgageAPI/agent/:id"
	m[ X ] p[   ] POST "/mortgageAPI/agent/:agent_id/property/:property_id"
	m[ X ] p[   ] POST "/mortgageAPI/agent/:id/appointment"
	m[ X ] p[   ] PATCH "/mortgageAPI/agent/:id/appointment"
	m[ X ] p[   ] DELETE "/mortgageAPI/agent/:id/appointment"













