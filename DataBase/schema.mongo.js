const mongoose = require('mongoose');

const Property = mongoose.model("Property", new mongoose.Schema({
  "id": Number,
  "price": Number,
  "appointments": Array
}));

const Agent = mongoose.model("Agent", new mongoose.Schema({
  "name": String,
  "title": String,
  "rating": Number,
  "recentSales": Number,
  "phone": String,
  "avatar": String,   // s3 resource
  "about": String,    // a description
  "agency": String,   // employer
  "appointments": Array
}));

module.exports.Property = PropertyPriceModel;
module.exports.Agent = MortgageAgentModel;