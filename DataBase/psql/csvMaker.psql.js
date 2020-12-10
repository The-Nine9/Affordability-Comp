// TODO: promisify, or callbackify, the sequence of csv generatior
// currently, all six asynchronous processes will go off and run immediately
// upon invoking main. This is why main's callback "finished" message is actually
// the first thing you will see upon invocation, and the "finished" messages for
// each of the six csv generating functions don't happen in the order in which
// they are declared.

/**
 * output:
 *  ./csvs/properties.csv ---> seed Properties, HOAs
 *  ./csvs/agents.csv ---> seed Agents, Appointments
 *  ./csvs/join.csv ---> seed JoinAgentsProperties
 */

const fs = require("fs");
const Path = require("path");
const faker = require("faker");

const { writeAnyTimes } = require("../util/write.js");
const noCommas = require("../util/noCommas.js");

const tenMillion = 10000000;
const tenThousand = 10000;

const datadir = Path.join(__dirname, "data");

module.exports.properties = () => {
  let path = Path.join(datadir, "properties.csv");
  let header = "hoa_key,homePrice,address,beds,baths\n";
  let generator = () => {
    return "" +
      `${faker.random.boolean()
        ? faker.random.number({"min": 1, "max": 10000})
        : -1},` +
      `${faker.random.number({"min": 100000, "max": 20000000})},`+
      `${faker.address.streetAddress().noCommas()},`+
      `${faker.random.number({"min": 1, "max": 7})},`+
      `${faker.random.number({"min": 1, "max": 7})}\n`;
  };
  // console.log(generator());
  writeAnyTimes(
    fs.createWriteStream(path),
    header,
    generator,
    tenMillion,
    'utf8',
    () => {console.log("properties.csv ---> completed")}
  );
}

module.exports.hoas = () => {
  let path = Path.join(datadir, "hoas.csv");
  let header = "name,fee\n";
  let generator = () => {
    return "" +
      `${faker.company.companyName().noCommas()},` +
      `${faker.random.number({"min": 100, "max": 1000})}\n`;
  };
  // console.log(generator());
  writeAnyTimes(
    fs.createWriteStream(path),
    header,
    generator,
    tenThousand,
    'utf8',
    () => {console.log("hoas.csv ---> completed")}
  );
}

module.exports.agents = () => {
  let path = Path.join(datadir, "agents.csv");
  let header = "name,title,rating,recentSales,phone,email,avatar, about, agency\n";
  let generator = () => {
    return "" +
      `${faker.name.findName().noCommas()},` +
      `${faker.name.jobTitle().noCommas()},` +
      `${faker.random.number({"min": 1, "max": 5})},` +
      `${faker.random.number({"min": 10, "max": 200})},` +
      `${faker.phone.phoneNumber().noCommas()},` +
      `${faker.internet.email().noCommas()},` +
      "https://loremflickr.com/100/100/face," +
      `${faker.commerce.productDescription().noCommas()},` +
      `${faker.company.companyName().noCommas()}` + '\n';
  };
  // console.log(generator());
  writeAnyTimes(
    fs.createWriteStream(path),
    header,
    generator,
    tenMillion,
    'utf8',
    () => {console.log("agents.csv ---> completed")}
  );
}

module.exports.joinAgentsProperties = () => {
  let path = Path.join(datadir, "joinAgentsProperties.csv");
  let header = "property_key,agent_key\n";
  let property_key = 0;
  let generator = () => {
    property_key += 0.2;
    return "" +
      `${Math.floor(property_key)},` +
      `${faker.random.number({"min": 1, "max": tenMillion})}\n`;
  };
  // console.log(generator());
  writeAnyTimes(
    fs.createWriteStream(path),
    header,
    generator,
    5*tenMillion,
    'utf8',
    () => {console.log("joinAgentsProperties.csv ---> completed")}
  );
}

module.exports.appointments = () => {
  let path = Path.join(datadir, "appointments.csv");
  let header = "property_key,agent_key,client_key,inPerson,date,name, financing,zoom\n";
  let generator = () => {
    return "" +
      `${faker.random.number({"min": 1, "max": tenMillion})},` +
      `${faker.random.number({"min": 1, "max": tenMillion})},` +
      `${faker.random.number({"min": 1, "max": tenThousand})},` +
      `${faker.random.boolean()},` +
      `${faker.date.soon()},` +
      `${faker.name.findName().noCommas()},` +
      `${faker.random.boolean()},` +
      `https://us02web.zoom.us/j/${faker.random.number({"min": tenMillion, "max": 123*tenMillion})}\n`;
  };
  // console.log(generator());
  writeAnyTimes(
    fs.createWriteStream(path),
    header,
    generator,
    tenMillion,
    'utf8',
    () => {console.log("appointments.csv ---> completed")}
  );
}

module.exports.clients = () => {
  let path = Path.join(datadir, "clients.csv");
  let header = "name,phone,email\n";
  let generator = () => {
    return "" +
      `${faker.name.findName().noCommas()},` +
      `${faker.phone.phoneNumber().noCommas()},` +
      `${faker.internet.email().noCommas()}\n`;
  };
  // console.log(generator());
  writeAnyTimes(
    fs.createWriteStream(path),
    header,
    generator,
    tenThousand,
    'utf8',
    () => {console.log("clients.csv ---> completed")}
  );
}

module.exports.main = (callback=()=>{
  console.log("Done generating CSV data.")
}) => {
  module.exports.properties();
  module.exports.hoas();
  module.exports.agents();
  module.exports.joinAgentsProperties();
  module.exports.appointments();
  module.exports.clients();
  callback();
}
