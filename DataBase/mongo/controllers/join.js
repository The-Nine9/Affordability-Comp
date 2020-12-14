const mongoose = require("mongoose");

const { Agent, Property } = require("../schema.mongo.js");

module.exports.create = async (agent_id, property_id, callback) => {
  // Search properties by id
  // Search agents by id
  // update property with agent's id
  // update agent with proeprty's id
  let agent;
  let property;
  let err = null;
  try {

    property = await Property.findOne({"property_id": property_id});
    if (!property.agents) {
      property.agents = [];
    }
    property.agents.push(agent_id);
    await property.save();

    agent = await Agent.findOne({"agent_id": agent_id});
    if (!agent.properties) {
      agent.properties = [];
    }
    agent.properties.push(property_id);
    await agent.save();

  } catch(e) {
    err = e;
  } finally {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  }
};

module.exports.delete = async (agent_id, property_id, callback) => {
  // locate property by address AND name of agent
  // locate agent by name AND id of property
  agent_id = Number(agent_id);
  property_id = Number(property_id);
  let property;
  let agent;
  let err = null;
  try {

    agent = await Agent.findOne({"agent_id": agent_id});
    agent.properties = agent.properties.filter(id => id !== property_id);

    property = await Property.findOne({"property_id": property_id});
    property.agents = property.agents.filter(id => id !== agent_id);

    // console.log(`@param agent_id = ${agent_id} <${typeof agent_id}>`);
    // console.log(`@param property_id = ${property_id} <${typeof property_id}>`);
    // console.log(`agent.properties:\n${agent.properties}`);
    // console.log(`property.agents:\n${property.agents}`);

    await agent.save();
    await property.save();

  } catch(e) {
    err = e;
  } finally {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  }
};

