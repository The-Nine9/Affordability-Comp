// https://docs.mongodb.com/drivers/node/fundamentals/connection
// https://docs.mongodb.com/drivers/node/usage-examples/find

const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/"; // I've left mongo on its default port
const client = new MongoClient(url, { useUnifiedTopology: true });

module.exports.createAll = async(property, agents, callback) => {
  let err = null;
  let doc;
  try {
  /**
    * aquire property_id
    * check property for any existing agents:
    *  go thru the db and update those agents with property_id
    * for every new agent in the $agents paramater:
    *  aquire agent_id
    *  add the new agent_id to the agents array in $property paramater
    *  create a new agent doc
    *  accumulate the new doc to an array
    * save() the new agents array to the db
    */
    doc = await Property.find({}).sort({property_id: -1}).limit(1);
    property.property_id = doc[0].property_id + 1;
    // console.log(">>>property.property_id:\n",property.property_id);
    // console.log(">>>property.agents:\n",property.agents);
    if (property.agents.length) {
      // console.log(">>>about to update...\n");
      await Agent.updateMany(
        { agent_id: { $in: property.agents } }, // filter
        { $addToSet: { properties: property.property_id } } // doc
      );
    }
  } catch(e) {
    let err = e;
  } finally {
    callback(err);
  }
};

module.exports.readAll = async (property_id, callback) => {
  property_id = Number(property_id);
  let property = {};
  let agents = [];
  let err = null;
  await client.connect({ useNewUrlParser: true });
  const mortgage = client.db("mortgage");
  const properties_collection = mortgage.collection("properties");
  const agents_collection = mortgage.collection("agents");
  try {

    // await client.db("mortgage").command({ ping: 1 });

    property = await properties_collection.findOne({ property_id });
    console.log(`>>>>>>>>\nproperty_id\n>>>>>>>>\n${property_id}\t${typeof property_id}\nproperty\n>>>>>>>>\n${property}\n>>>>>>>>`);

    if (property.agents.length) {
      agents = await Promise.all(property.agents.map(async (agent_id) => {
        agent_id = Number(agent_id);
        return await agents_collection.findOne({agent_id});
      }));
    }

    // property = await Property.findOne({property_id});
    // if (property.agents.length) {
    //   agents = await Promise.all(property.agents.map(async (agent_id) => {
    //     return await Agent.findOne({agent_id});
    //   }));
    // }

  } catch(e) {
    err = e;
  } finally {
    await client.close();
    callback(err, {property, agents});
  }
};

// unused routes
// module.exports.create = async (agent_id, property_id, callback) => {
//   // Search properties by id
//   // Search agents by id
//   // update property with agent's id
//   // update agent with proeprty's id
//   let agent;
//   let property;
//   let err = null;
//   try {

//     property = await Property.findOne({"property_id": property_id});
//     if (!property.agents) {
//       property.agents = [];
//     }
//     property.agents.push(agent_id);
//     await property.save();

//     agent = await Agent.findOne({"agent_id": agent_id});
//     if (!agent.properties) {
//       agent.properties = [];
//     }
//     agent.properties.push(property_id);
//     await agent.save();

//   } catch(e) {
//     err = e;
//   } finally {
//     if (err) {
//       callback(err);
//     } else {
//       callback(null);
//     }
//   }
// };

// module.exports.delete = async (agent_id, property_id, callback) => {
//   // locate property by address AND name of agent
//   // locate agent by name AND id of property
//   agent_id = Number(agent_id);
//   property_id = Number(property_id);
//   let property;
//   let agent;
//   let err = null;
//   try {

//     agent = await Agent.findOne({"agent_id": agent_id});
//     agent.properties = agent.properties.filter(id => id !== property_id);

//     property = await Property.findOne({"property_id": property_id});
//     property.agents = property.agents.filter(id => id !== agent_id);

//     // console.log(`@param agent_id = ${agent_id} <${typeof agent_id}>`);
//     // console.log(`@param property_id = ${property_id} <${typeof property_id}>`);
//     // console.log(`agent.properties:\n${agent.properties}`);
//     // console.log(`property.agents:\n${property.agents}`);

//     await agent.save();
//     await property.save();

//   } catch(e) {
//     err = e;
//   } finally {
//     if (err) {
//       callback(err);
//     } else {
//       callback(null);
//     }
//   }
// };

