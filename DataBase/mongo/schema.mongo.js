const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/mortgage");
// mongoose.connect("mongodb://13.52.255.245/mortgage");
const db = mongoose.connection;

const Property = mongoose.model("Property", new mongoose.Schema({
  "property_id": Number,
  "price": Number,
  "beds": Number,
  "baths": Number,
  "address": String,
  "hoa": {
    "name": String,
    "fee": Number
  },
  "agents": [Number], // 2-way embeddeing, with ids as foreign keys
  "appointments": [{
    "appointment_id": Number,
    "contactAgent": {
      "name": String,
      "phone": String,
      "email": String
    },
    "contactClient": {
      "client_id": Number,
      "name": String,
      "phone": String,
      "email": String
    },
    "date": Date,
    "inPerson": Boolean,
    "zoom":  String,
  }]
}));

const Agent = mongoose.model("Agent", new mongoose.Schema({
  "agent_id": Number,
  "name": String,
  "title": String,
  "rating": Number,
  "recentSales": Number,
  "phone": String,
  "email": String,
  "avatar": String,
  "about": String,
  "agency": String,
  "properties": [Number], // 2-way embeddeing, with ids as foreign keys
  "appointments": [{
    "appointment_id": Number,
    "contactClient": {
      "client_id": Number,
      "name": String,
      "phone": String,
      "email": String
    },
    "time": Date,
    "inPerson": Boolean,
    "zoom": String
  }]
}));

module.exports.Property = Property;
module.exports.Agent = Agent;
