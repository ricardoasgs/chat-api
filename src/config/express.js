const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const socketEvents = require("../modules/socketEvents");
const app = express();

app.use(express.static(__dirname + "./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

var port = process.env.PORT || 3000;

server = app.listen(port);

const io = require("socket.io").listen(server);

socketEvents(io);

module.exports = app;
