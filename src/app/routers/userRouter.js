const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/contact", userController.getContacts);

router.post("/contact", userController.newContact);

module.exports = router;
