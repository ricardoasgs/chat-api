const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const socketEvents = require("../modules/socketEvents");
const app = express();

app.use(express.static(__dirname + "/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(express.static("./public"));

server = app.listen(3003 || process.env.PORT);

const io = require("socket.io").listen(server);

socketEvents(io);

module.exports = app;
