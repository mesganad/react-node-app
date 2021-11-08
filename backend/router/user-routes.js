const express = require("express");

const router = express.Router();

const userController = require("../controller/user-controller");

const clientController = require("../controller/client-controller");

router.post("/signup", userController.signup);

router.post("/signin", userController.signin);

router.post("/clients", clientController.registerClient);

router.get("/clients", clientController.getAllClients);

router.delete("/clients/:id", clientController.deleteClient);

router.put("/clients/:id", clientController.updateClient);

module.exports = router;
