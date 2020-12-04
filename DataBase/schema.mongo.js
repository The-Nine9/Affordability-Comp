const mongoose = require('mongoose');

const HomePriceModel = mongoose.model('Price', new mongoose.Schema({ id: Number, homePrice: Number }));

const MortgageAgentModel = mongoose.model('Agent', new mongoose.Schema({
  name: String,
  title: String,
  rating: Number,
  recentSales: Number,
  phone: String,
  avatar: String,   // s3 resource
  about: String,    // a description
  agency: String,   // employer
}));

const MortgageAgentAppointmentModel = mongoose.model('Schedule', new mongoose.Schema({
  inPerson: Boolean,
  date: String,
  time: String,
  name: String,
  phone: String,
  email: String,
  financing: Boolean,
}));

module.exports.PropertyPrice = PropertyPriceModel;
module.exports.MortgageAgent = MortgageAgentModel;
module.exports.MortgageAgentAppointment = MortgageAgentAppointmentModel;

// This is just OK... consider denormalization
// one table for everything? one query for all data about a property --> faster, much more space taken (agents+etc. duplicated across properties)