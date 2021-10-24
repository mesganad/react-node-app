const db = require("../util/db");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const { name, username, role, password } = req.body;

  let hashpwd;

  try {
    hashpwd = await bcrypt.hash(password, 10);
  } catch (hasherror) {
    next(hasherror);
  }

  const sqlInsert =
    "insert into projectdb.user (name, username, role,project_id, password) values (?, ?, ?,?, ?)";
  try {
    const connResult = await db.query(sqlInsert, [
      name,
      username,
      role,
      1,
      hashpwd,
    ]);
    console.log(connResult[0]);
    res.json({ success: 1 });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res, next) => {
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
