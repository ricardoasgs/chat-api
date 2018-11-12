const express = require("express");
const userController = require("../controllers/userControllerr");

const router = express.Router();

router.get("/contact", userController.getContacts);

router.post("/contact", userController.newContact);

module.exports = router;
