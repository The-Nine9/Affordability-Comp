#kiss

**11/23: Image Hosting**
Was going to have my seed-db script work to both seed the db with AWS S3 links as well as local filepaths.
Implemented the seeding script.
Realized that I would need to do a lot of work for my frontend to work with both types of links, i.e., install a webpack module and re-work my <img> elements to require() the paths.
--> Decided to just use my AWS links.

**11/25: CSS Transition Effects**
Was going to drive forward and implement the animated transitions on hover.
Decided they can wait for their time in Rob's tracker for me. Priorities!

**11/27: Sample Deliverables**
Was keeping track of a lot of partial/finished states
Moved to make it unfinished / wip / done. use some common sense when things could stand to be fixed up or not.

**12/14: SDC Endpoints**
Implemented 12 endpoints to query MongoDB
This is gratuitous:
	1) I do not need to implement endpoints on my server to execute my queries until I have optimized the query on the cli
	2) I certainly do not need 12 endpoints
	3) Using mongoose impairs performance
I am moving to have just two primary queries
  * POST "/mortageAPI/property/all"
  * GET "/mortageAPI/property/:id/all"
e; After talking with Chris, I'm going to stick with just the GET query!!


