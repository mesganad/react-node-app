const db = require("../util/db");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const Joi = require("joi");

//Handling signup request
exports.signup = async (req, res, next) => {
  //Input validation
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
    role: Joi.string().required(),
    email: Joi.string().required().email(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const { name, username, role, password, email } = req.body;

  let hashpwd;
  try {
    hashpwd = await bcrypt.hash(password, 10);
  } catch (hasherror) {
    next(hasherror);
  }

  const sqlInsert =
    "insert into projectdb.user (name, username, role, password,email) values (?, ?, ?,?, ?)";
  try {
    await db.query(
      sqlInsert,
      [name, username, role, hashpwd, email],
      (err, resp) => {
        res.send({ success: true });
      }
    );
  } catch (err) {
    next(err);
  }
};

//Handling login request
exports.signin = async (req, res, next) => {
  //Input validation
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const { username, password } = req.body;
  const sqlInsert = "SELECT password,role FROM projectdb.user where username=?";

  let response;

  db.query(sqlInsert, username, async (err, result) => {
    console.log(result);
    response = result[0];
    console.log(response.role);
    const isValid = await bcrypt.compare(password, response.password);
    console.log(isValid);
    if (isValid) {
      const token = jwt.sign({ username, role: response.role }, "secret");
      res.json({ role: response.role, success: true, token: token });
    } else {
      res.json({ message: "Invalid user" });
    }
  });
};
