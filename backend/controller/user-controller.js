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
  console.log("Username: ", username);

  let hashpwd;
  try {
    hashpwd = await bcrypt.hash(password, 10);
  } catch (hasherror) {
    next(hasherror);
  }

  const accountQuery = "select * from projectdb.user where username=?";
  const sqlInsert =
    "insert into projectdb.user (name, username, role, password,email) values (?, ?, ?,?, ?)";

  try {
    await db.query(accountQuery, username, (error, accountResult) => {
      if (accountResult && accountResult[0]) {
        res.send({ success: false, message: "Account already exists!" });
        return;
      } else {
        db.query(
          sqlInsert,
          [name, username, role, hashpwd, email],
          (err, resp) => {
            res
              .status(200)
              .send({ success: true, message: "Successfully registered!" });
          }
        );
      }
    });
  } catch (err) {
    console.log(err);
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
  const sqlInsert = "SELECT * FROM projectdb.user where username=?";

  let response;

  db.query(sqlInsert, username, async (err, result) => {
    console.log(result);
    response = result[0];
    let isValid = false;
    if (response) {
      console.log(response);
      isValid = await bcrypt.compare(password, response.password);
    }
    if (isValid) {
      const token = jwt.sign({ username, role: response.role }, "secret");

      res.json({
        role: response.role,
        success: true,
        token: token,
        account: response,
      });
    } else {
      res.json({ success: false, message: "Invalid Username or Password" });
    }
  });
};
