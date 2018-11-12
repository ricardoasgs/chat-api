const mongoose = require("../../database");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  }
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
