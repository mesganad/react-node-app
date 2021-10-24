const express = require("express");

const cors = require("cors");

const userRoute = require("./router/user-routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoute);

app.listen(3003, () => {
  console.log("Listening on port 3003");
});
