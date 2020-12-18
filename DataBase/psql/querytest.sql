--from bash, run:
--$ psql mortgage -x -f querytest.sql

EXPLAIN ANALYZE SELECT p.*,
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


-- property_id | 1234467
-- hoa_key     | -1
-- homeprice   | 15236689
-- address     | 137 Guy Alley
-- beds        | 7
-- baths       | 5
-- json_agg    | [{"agent_id" : 1864722, "name" : "Allison Kilback", "title" : "Chief Solutions Director", "rating" : 2, "recentSales" : 43, "phone" : "1-773-466-8983 x0902", "email" : "Kelton_Ryan82@gmail.com", "avatar" : "https://loremflickr.com/100/100/face", "about" : "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", "agency" : "Block Hyatt and O'Reilly"}, {"agent_id" : 2704941, "name" : "Ms. Angelica Lowe", "title" : "Dynamic Infrastructure Planner", "rating" : 4, "recentSales" : 158, "phone" : "1-684-618-5149 x8301", "email" : "Kasey.Stroman47@hotmail.com", "avatar" : "https://loremflickr.com/100/100/face", "about" : "The automobile layout consists of a front-engine design with transaxle-type transmissions mounted at the rear of the engine and four wheel drive", "agency" : "Dietrich Inc"}, {"agent_id" : 7414121, "name" : "Krystal Gleason II", "title" : "Principal Integration Technician", "rating" : 3, "recentSales" : 72, "phone" : "(206) 436-9929 x425", "email" : "Elissa67@gmail.com", "avatar" : "https://loremflickr.com/100/100/face", "about" : "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality", "agency" : "Barton - Lockman"}, {"agent_id" : 3499629, "name" : "Tracey Haag", "title" : "Lead Tactics Strategist", "rating" : 5, "recentSales" : 54, "phone" : "1-704-838-4743", "email" : "Ole60@gmail.com", "avatar" : "https://loremflickr.com/100/100/face", "about" : "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support", "agency" : "Rodriguez - McGlynn"}, {"agent_id" : 8662811, "name" : "Annie Stiedemann", "title" : "Dynamic Group Technician", "rating" : 1, "recentSales" : 166, "phone" : "1-346-476-3368 x32084", "email" : "Natasha60@gmail.com", "avatar" : "https://loremflickr.com/100/100/face", "about" : "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality", "agency" : "Rutherford - Lemke"}, {"agent_id" : 1864722, "name" : "Allison Kilback", "title" : "Chief Solutions Director", "rating" : 2, "recentSales" : 43, "phone" : "1-773-466-8983 x0902", "email" : "Kelton_Ryan82@gmail.com", "avatar" : "https://loremflickr.com/100/100/face", "about" : "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", "agency" : "Block Hyatt and O'Reilly"}, {"agent_id" : 2704941, "name" : "Ms. Angelica Lowe", "title" : "Dynamic Infrastructure Planner", "rating" : 4, "recentSales" : 158, "phone" : "1-684-618-5149 x8301", "email" : "Kasey.Stroman47@hotmail.com", "avatar" : "https://loremflickr.com/100/100/face", "about" : "The automobile layout consists of a front-engine design with transaxle-type transmissions mounted at the rear of the engine and four wheel drive", "agency" : "Dietrich Inc"}, {"agent_id" : 7414121, "name" : "Krystal Gleason II", "title" : "Principal Integration Technician", "rating" : 3, "recentSales" : 72, "phone" : "(206) 436-9929 x425", "email" : "Elissa67@gmail.com", "avatar" : "https://loremflickr.com/100/100/face", "about" : "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality", "agency" : "Barton - Lockman"}, {"agent_id" : 3499629, "name" : "Tracey Haag", "title" : "Lead Tactics Strategist", "rating" : 5, "recentSales" : 54, "phone" : "1-704-838-4743", "email" : "Ole60@gmail.com", "avatar" : "https://loremflickr.com/100/100/face", "about" : "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support", "agency" : "Rodriguez - McGlynn"}, {"agent_id" : 8662811, "name" : "Annie Stiedemann", "title" : "Dynamic Group Technician", "rating" : 1, "recentSales" : 166, "phone" : "1-346-476-3368 x32084", "email" : "Natasha60@gmail.com", "avatar" : "https://loremflickr.com/100/100/face", "about" : "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality", "agency" : "Rutherford - Lemke"}]
