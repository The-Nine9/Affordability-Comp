const mongoose = require("mongoose");

const { Property } = require("../schema.mongo.js");

module.exports.create = (data, callback) => {
  Property.create(data, callback);
};

module.exports.read = (id, callback) => {
  Property.findOne({"property_id": id}, callback);
};

module.exports.update = (id, data, callback) => {
  Property.findOneAndUpdate({"property_id": id}, {$set: data}, callback)
};

module.exports.delete = (id, callback) => {
  Property.deleteOne({"property_id": id}, callback);
}
