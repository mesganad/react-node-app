const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const userRoute = require("./router/user-routes");

app.use("/api", userRoute);

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
