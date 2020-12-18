const mongoose = require("mongoose");

const { Agent } = require("../schema.mongo.js");

module.exports.create = (data, callback) => {
  Agent.create(data, callback);
};

module.exports.read = (id, callback) => {
  // console.log(`In agent.js: name is ${name} <${typeof name}>`);
  // console.log(`stringified name: ${JSON.stringify(name)}`);
  Agent.findOne({"agent_id": id}, callback);
};

module.exports.update = (id, data, callback) => {
  Agent.findOneAndUpdate({"agent_id": id}, {$set: data}, callback);
};

module.exports.delete = (id, callback) => {
  Agent.deleteOne({"agent_id": id}, callback);
};

module.exports.createAppointmnet = async (id, data, callback) => {
  let err = null;
  let agent;
  try {
    agent = await Agent.findOne({"agent_id": id});
    data.appointment_id = 1 + agent.appointments[agent.appointments.length-1].appointment_id;
    agent.appointments.push(data);
    await agent.save();
  } catch(e) {
    err = e;
  } finally {
    callback(err);
  }
}

module.exports.updateAppointmnet = async (agent_id, appointment_id, data, callback) => {
  let err = null;
  let agent;
  try {
    agent = await Agent.findOne({"agent_id": agent_id});
    for (let i = 0; i < agent.appointments.length; i++) {
      if (appointment.appointment_id === appointment_id) {
        Object.assign(agent.appointments[index], data);
        break;
      }
    }
    await agent.save();
  } catch(e) {
    err = e;
  } finally {
    callback(err);
  }
}

module.exports.deleteAppointmnet = async (agent_id, appointment_id, callback) => {
  let err = null;
  let agent;
  try {
    agent = await Agent.findOne({"agent_id": agent_id});
    for (let i = 0; i < agent.appointments.length; i++) {
      if (appointment.appointment_id === appointment_id) {
        agent.appointments.splice(i, 1);
        break;
      }
    }
    await agent.save();
  } catch(e) {
    err = e;
  } finally {
    callback(err);
  }
}
