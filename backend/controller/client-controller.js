const db = require("../util/db");

const Joi = require("joi");

//Handling signup request
exports.registerClient = async (req, res, next) => {
  //Input validation
  // const schema = Joi.object({
  //   clientName: Joi.string().min(3).required(),
  //   clientAddress: Joi.string().min(3).required(),
  //   employeeNumber: Joi.string().min(3).required(),
  //   status: Joi.string().required(),
  //   userId: Joi.number(),
  // });

  // const result = schema.validate(req.body);
  // if (result.error) {
  //   res.status(400).send(result.error.details[0].message);
  //   return;
  // }

  const { clientName, clientAddress, employeeNumber, status, userId } =
    req.body;
  const uId = parseInt(userId);
  const clientQuery = "select * from projectdb.client where client_name=?";

  const sqlInsert =
    "insert into projectdb.client (client_name, client_address, employees_number, status,user_id) values (?, ?, ?,?, ?)";
  try {
    await db.query(clientQuery, clientName, (error, clientResult) => {
      if (clientResult && clientResult[0]) {
        res.status(400).send({ success: false, message: "Client already exists!" });
        return;
      } else {
        db.query(
          sqlInsert,
          [clientName, clientAddress, employeeNumber, status, uId],
          (err, resp) => {
            console.log("after insertion", resp);
            res
              .status(200)
              .send({ success: true, message: "Successfully registered!" });
          }
        );
      }
    });
  } catch (err) {
    console.log(err);
    res.send({ success: false, message: "Client registration failed!" });
  }
};

exports.getAllClients = async (req, res, next) => {
  //const uId=parseInt(userId);

  const clientQuery = "select * from projectdb.client";
  await db.query(clientQuery, (error, clientsResult) => {
    console.log(clientsResult);
    if (clientsResult.length !== 0) {
      res.status(200).send({ clients: clientsResult });
    } else {
      res.status(404).send({ message: "Clients not found!" });
    }
  });
};

exports.deleteClient = async (req, res, next) => {
  const clientId = req.params.id;
  console.log("clientId: ", clientId);

  const clientQuery = "select * from projectdb.client where client_id=?";
  await db.query(clientQuery, clientId, (error, clientResult) => {
    console.log(clientResult);
    if (clientResult.length === 0) {
      res.status(404).send({
        success: false,
        message: "Client with such id doesn't exists!",
      });
      return;
    }
  });

  const deleteQuery = "delete from projectdb.client where client_id=?";
  await db.query(deleteQuery, clientId, (error, clientsResult) => {
    res.status(200).send({ success: true });
  });
};

//Handling update request
exports.updateClient = async (req, res, next) => {
  const clientId = req.params.id;
  //Input validation
  const schema = Joi.object({
    clientName: Joi.string().min(3).required(),
    clientAddress: Joi.string().min(3).required(),
    employeeNumber: Joi.string().min(3).required(),
    status: Joi.string().required(),
    userId: Joi.number(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const { clientName, clientAddress, employeeNumber, status, userId } =
    req.body;
  //const uId=parseInt(userId);

  const clientQuery = "select * from projectdb.client where client_id=?";
  await db.query(clientQuery, clientId, (error, clientResult) => {
    console.log(clientResult);
    if (clientResult.length == 0) {
      res
        .status(404)
        .send({ success: false, message: "Client does not exists!" });
      return;
    }
  });
  const sqlUpdate =
    "update projectdb.client set client_name=?, client_address=?, employees_number=?, status=?  where client_id=?";
  try {
    await db.query(
      sqlUpdate,
      [clientName, clientAddress, employeeNumber, status, clientId],
      (err, resp) => {
        console.log(resp);
        res
          .status(201)
          .send({ success: true, message: "Successfully updated!" });
      }
    );
  } catch (err) {
    console.log(err);
    //res.send({ success: false, message: "Client registration failed!" });
  }
};
