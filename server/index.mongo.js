/* eslint-disable no-console */
const express = require('express');
const app = express();
const PORT = 8020;

require('newrelic');

app.use(express.json());

const Agent = require("../DataBase/mongo/controllers/agent.js");
const Property = require("../DataBase/mongo/controllers/property.js");
const Join = require("../DataBase/mongo/controllers/join.js");

const errorMessage = (method, err, docs) => {
  let res = "begin-------------------------------------\n";
  res += `ERROR from server/index.js: failed to ${method}\n`;
  res += "err------------------------------------\n";
  res += err + "\n";
  res += "docs--------------------------------------\n";
  res += docs + "\n";
  res += "--------------------------------------end\n";
  return res;
};

app.route("/mortgageAPI/main/:property_id?")
  .post((req, res) => {
    Join.createAll(req.body.property, req.body.agents, (err, docs) => {
      if (err) {
        res.status(500).send(errorMessage("post", err, docs));
      } else {
        res.status(201).send("successfully created both a property and its associated agents");
      }
    });
  })
  .get((req, res) => {
    Join.readAll(req.params.property_id, (err, docs) => {
      if (err) {
        res.status(500).send(errorMessage("get", err, docs));
      } else {
        res.status(200).json(docs);
      }
    })
  });

app.route("/mortgageAPI/property/:id")
  .post((req, res) => {
    Property.create(req.body.data, (err, docs) => {
      if (err) {
        res.status(500).send(errorMessage("post", err, docs));
      } else {
        res.status(201).send("successfully created property");
      }
    });
  })
  .get((req, res) => {
    Property.read(req.params.id, (err, docs) => {
      if (err) {
        res.status(404).send(errorMessage("get", err, docs));
      } else {
        res.status(200).send(docs);
      }
    });
  })
  .patch((req, res) => {
    Property.update(req.params.id, req.body.data, (err, docs) => {
      if (err) {
        res.status(500).send(errorMessage("patch", err, docs));
      } else {
        res.status(200).send("successfully updated property");
      }
    });
  })
  .delete((req, res) => {
    Property.delete(req.params.id, (err, docs) => {
      if (err) {
        res.status(500).send(errorMessage("delete", err, docs));
      } else {
        res.status(204).send("successfully deleted property"); // TODO: this works, but the message does not appear?
      }
    });
  });

app.route("/mortgageAPI/agent/:agent_id/property/:property_id")
  .post((req, res) => {
    Join.create(req.params.agent_id, req.params.property_id, (err) => {
      if (err) {
        res.status(500).send(errorMessage("post", err, docs));
      } else {
        res.status(201).send("successfully created agent-property association");
      }
    });
  })
  .delete((req, res) => {
    Join.delete(req.params.agent_id, req.params.property_id, (err) => {
      if (err) {
        res.status(500).send(errorMessage("delete", err, docs));
      } else {
        res.status(201).send("successfully deleted agent-property association");
      }
    });
  });

app.route("/mortgageAPI/agent/:agent_id/appointment/appointment_id")
  .post((req, res) => {
    Agent.createAppointmnet(req.body.data, (err, docs) => {
      if (err) {
        res.status(500).send(errorMessage("post", err, docs));
      } else {
        res.status(201).send("successfully created appointment");
      }
    });
  })
  .patch((req, res) => {
    let agent_id = Number(req.params.agent_id);
    let appointment_id = Number(req.params.appointment_id);
    Agent.updateAppointmnet(agent_id, appointment_id, req.body.data, (err) => {
      if (err) {
        res.status(500).send(errorMessage("patch", err, docs));
      } else {
        res.status(200).send("successfully updated appointment");
      }
    });
  })
  .delete((req, res) => {
    let agent_id = Number(req.params.agent_id);
    let appointment_id = Number(req.params.appointment_id);
    Agent.deleteAppointmnet(agent_id, appointment_id, (err) => {
      if (err) {
        res.status(500).send(errorMessage("delete", err, docs));
      } else {
        res.status(204).send("successfully deleted appointment");
      }
    });
  });

app.route("/mortgageAPI/agent/:id")
  .post((req, res) => {
    Agent.create(req.body.data, (err, docs) => {
      if (err) {
        res.status(500).send(errorMessage("post", err, docs));
      } else {
        res.status(201).send("successfully created agent");
      }
    });
  })
  .get((req, res) => {
    Agent.read(req.params.id, (err, docs) => {
      if (err) {
        res.status(404).send(errorMessage("get", err, docs));
      } else {
        res.status(200).send(docs);
      }
    });
  })
  .patch((req, res) => {
    Agent.update(req.params.id, req.body.data, (err, docs) => {
      if (err) {
        res.status(500).send(errorMessage("patch", err, docs));
      } else {
        res.status(200).send("successfully updated agent");
      }
    })
  })
  .delete((req, res) => {
    Agent.delete(req.params.id, (err, docs) => {
      if (err) {
        res.status(500).send(errorMessage("delete", err, docs));
      } else {
        res.status(204).send("successfully deleted agent");
      }
    })
  });

app.use('/mortgage/:id', express.static('client/dist'));
app.use(express.static('client/dist'));
// app.get('*/:id/db', mongoCont.get);
app.listen(PORT, () => {
  console.log(`Listening on 127.0.0.1:${PORT}`);
});
