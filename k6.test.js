// @ https://medium.com/swlh/beginners-guide-to-load-testing-with-k6-85ec614d2f0d

import { check } from "k6";
import http from "k6/http";

import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";

const apiRoute = "http://localhost:8020/mortgageAPI/main/"; // "https://test.loadimpact.com/
const TEN_MILLION = 10000000;

export default function() {
  let url = apiRoute + Math.round( randomIntBetween(1,TEN_MILLION) );
  let res = http.get(url);
  check(res, {
    "is status 200": (r) => r.status === 200
  });
};
