const User = require("../models/user");
const Contact = require("../models/contact");

// buscar contatos
exports.getContacts = async function(req, res) {
  const { _id } = req.body;

  try {
    const user = await User.findById(_id).populate("contacts");

    if (!user) return res.status(400).send({ error: "User doesnt exists" });

    const contacts = user.contacts;

    return res.send({
      contacts
    });
  } catch (err) {
    return res.status(400).send({ error: "Search Contacts failed" });
  }
};

// cadastrar contatos
exports.newContact = async function(req, res) {
  try {
    //console.log(req.body);
    const { _id, email, name } = req.body;

    const user = await User.findById(_id);

    if (user) {
      const contact = await Contact.create({
        name,
        email
      });

      const newContacts = user.contacts;
      newContacts.push(contact._id);

      await user.updateOne({ $set: { contacts: newContacts } });
    } else {
      return res
        .status(400)
        .send({ error: "Error creating new contact, user doesnt exists" });
    }

    return res.status(200).send({ message: "Contacts updated!" });
  } catch (err) {
    //console.log(err);
    return res.status(400).send({ error: "Error creating new Contact" });
  }
};

module.exports;
