#REFERENCES
Beginner's Guide to Load Testing with K6 @
	https://medium.com/swlh/beginners-guide-to-load-testing-with-k6-85ec614d2f0d

#NOTES
2 Types of testing:
	Load Testing: load system and monitor bX.
	Stress Testing: load test up to max load

#METRICS

##12:23 5:00PM (APDEX = 0.12)
	{Affordability-Comp} $k6 run -u 10 -d 30s k6.test.js

	          /\      |‾‾| /‾‾/   /‾‾/   
	     /\  /  \     |  |/  /   /  /    
	    /  \/    \    |     (   /   ‾‾\  
	   /          \   |  |\  \ |  (‾)  | 
	  / __________ \  |__| \__\ \_____/ .io

	  execution: local
	     script: k6.test.js
	     output: -

	  scenarios: (100.00%) 1 scenario, 10 max VUs, 1m0s max duration (incl. graceful stop):
	           * default: 10 looping VUs for 30s (gracefulStop: 30s)

	WARN[0001] Error from API server                         error="listen tcp 127.0.0.1:6565: bind: address already in use"

	running (0m30.1s), 00/10 VUs, 2154 complete and 0 interrupted iterations
	default ✓ [======================================] 10 VUs  30s

	    ✓ is status 200

	    checks.....................: 100.00% ✓ 2154 ✗ 0   
	    data_received..............: 14 MB   450 kB/s
	    data_sent..................: 224 kB  7.4 kB/s
	    http_req_blocked...........: avg=120.15µs min=2µs     med=3µs      max=30.07ms  p(90)=5µs      p(95)=6µs     
	    http_req_connecting........: avg=3.17µs   min=0s      med=0s       max=2.36ms   p(90)=0s       p(95)=0s      
	    http_req_duration..........: avg=139.21ms min=83.88ms med=126.72ms max=864ms    p(90)=168.5ms  p(95)=221.79ms
	    http_req_receiving.........: avg=87.67µs  min=30µs    med=77µs     max=1.64ms   p(90)=120.7µs  p(95)=145µs   
	    http_req_sending...........: avg=21.53µs  min=9µs     med=19µs     max=298µs    p(90)=26µs     p(95)=36µs    
	    http_req_tls_handshaking...: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s      
	    http_req_waiting...........: avg=139.1ms  min=83.79ms med=126.61ms max=863.87ms p(90)=168.39ms p(95)=221.63ms
	    http_reqs..................: 2154    71.447736/s
	    iteration_duration.........: avg=139.51ms min=84.02ms med=126.91ms max=864.18ms p(90)=168.65ms p(95)=221.99ms
	    iterations.................: 2154    71.447736/s
	    vus........................: 10      min=10 max=10
	    vus_max....................: 10      min=10 max=10


