const fs = require('fs');
const Path = require('path');
const faker = require('faker');

const { writeAnyTimes } = require("../util/write.js");

const tenMillion = 10000000;
const tenThousand = 10000;

const datadir = Path.join(__dirname, "data");

const {Property, Agent} = require("./schema.mongo.js");

const header = "{";
const tail = "}";

module.exports.properties = () => {
  const getAgents = () => {
    let agents = [];
    let numAgents = faker.random.number({min: 1, max: 10});
    for (let i = 0; i < numAgents; i++) {
      agents.push(faker.random.number({min: 1, max: tenMillion}));
    }
    return agents;
  };
  const getHoa = () => {
    return faker.random.boolean()
      ? { "name": faker.company.companyName(),
          "fee": faker.random.number({min: 100, max: 1000}) }
      : null;
  };
  const getAppointments = () => {
    if (faker.random.boolean() && faker.random.boolean()) {
      var appointments = [];
      var numAppointments = faker.random.number({min: 1, max: 10});
      for (let i = 0; i < numAppointments; i++) {
        appointments.push[
          {
            "appointment_id": faker.random.number({min: 1, max: tenThousand}),
            "contactAgent": {
              "name": faker.name.findName(),
              "phone": faker.phone.phoneNumber(),
              "email": faker.internet.email()
            },
            "contactClient": {
              "client_id": faker.random.number({min: 1, max: tenThousand}),
              "name": faker.name.findName(),
              "phone": faker.phone.phoneNumber(),
              "email": faker.internet.email()
            },
            "date": faker.date.soon(),
            "inPerson": faker.random.boolean(),
            "zoom": `https://us02web.zoom.us/j/${faker.random.number({"min": tenMillion, "max": 123*tenMillion})}`
          }
        ];
      }
      return appointments;
    } else {
      return null;
    }
  };
  const generator = (i) => {
    let terminator = (i > 0) ? ",\n" : "\n";
    return JSON.stringify({
      "property_id": i,
      "price": faker.random.number({min: 10*tenThousand, max: 2*tenMillion}),
      "beds": faker.random.number({min: 1, max: 10}),
      "baths": faker.random.number({min: 1, max: 10}),
      "address": faker.address.streetAddress(),
      "hoa": getHoa(),
      "agents": getAgents(),
      "appointments": getAppointments()
    }) + terminator;
  };
  writeAnyTimes(
    fs.createWriteStream(Path.join(datadir, "properties.json")),
    header,
    generator,
    tenThousand,
    "utf8",
    () => {console.log("properties.json ---> completed")},
    tail
  );
};

module.exports.agents = () => {
  const getProperties = () => {
    let properties = [];
    let numProperties = faker.random.number({min: 0, max: 10});
    for (let i = 0; i < numProperties; i++) {
      properties.push(faker.random.number({min: 1, max: tenMillion}));
    }
    return properties;
  };
  const getAppointments = () => {
    let appointments = [];
    let numAppointments = faker.random.number({min: 0, max: 10});
    for (let i = 0; i < numAppointments; i++) {
      appointments.push({
        "appointment_id": faker.random.number({min: 1, max: tenThousand}),
        "contactClient": {
          "client_id": faker.random.number({min: 1, max: tenMillion}),
          "name": faker.name.findName(),
          "phone": faker.phone.phoneNumber(),
          "email": faker.internet.email()
        },
        "time": faker.date.soon(),
        "inPerson": faker.random.boolean(),
        "zoom": `https://us02web.zoom.us/j/${faker.random.number({"min": tenMillion, "max": 123*tenMillion})}`
      });
    }
    return appointments;
  };
  const generator = (i) => {
    let terminator = (i > 0) ? ",\n" : "\n";
    return JSON.stringify({
      "agent_id": faker.random.number({min: 1, max: tenMillion}),
      "name": faker.name.findName(),
      "title": faker.name.title(),
      "rating": faker.random.number({min: 1, max: 5}),
      "recentSales": faker.random.number({min: 1, max: 200}),
      "phone": faker.phone.phoneNumber(),
      "email": faker.internet.email(),
      "avatar": "https://loremflickr.com/100/100/face",
      "about": faker.commerce.productDescription(),
      "agency": faker.company.companyName(),
      "properties": getProperties(), // 2-way embeddeing, with ids as foreign keys
      "appointments": getAppointments()
    }) + terminator;
  };
  writeAnyTimes(
    fs.createWriteStream(Path.join(datadir, "agents.json")),
    header,
    generator,
    tenThousand,
    "utf8",
    () => {console.log("agents.json ---> completed")},
    tail
  );
};

module.exports.main = () => {
  module.exports.properties();
  module.exports.agents();
};
