const db = require('../models');
const Contact = db.contacts;

const addContact = (req, res) => {
  // Validate request
  //#swagger.tags=['Contacts']

  if (!req.body) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // Create a Temple
  const contact = new Contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  });
  // Save Temple in the database
  contact
    .save(contact)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Contact.',
      });
    });
};

const getAllContacts = (req, res) => {
  //#swagger.tags=['Contacts']

  Contact.find(
    {},
    {
      firstName: 1,
      lastName: 1,
      email: 1,
      favoriteColor: 1,
      birthday: 1,
    },
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving contacts.',
      });
    });
};

const getSingleContact = (req, res) => {
  //#swagger.tags=['Contacts']

  const userId = req.params.id;
  Contact.find({ _id: userId })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: 'Not found Contact with id ' + userId });
      else res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Contact with _id=' + userId,
      });
    });
};

const updateSingleContact = (req, res) => {
  //#swagger.tags=['Contacts']

  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const userId = req.params.id;

  Contact.replaceOne({ _id: userId }, contact)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Contact with id=${userId}. Maybe Contact was not found!`,
        });
      } else res.send({ message: 'Contact was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Contact with id=' + userId,
      });
    });
};

const deleteSingleContact = (req, res) => {
  //#swagger.tags=['Contacts']

  const userId = req.params.id;

  Contact.findByIdAndRemove(userId)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`,
        });
      } else {
        res.send({
          message: 'Contact was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Contact with id=' + id,
      });
    });
};

// Delete all Temples from the database.
const deleteAllContacts = (req, res) => {
  //#swagger.tags=['Contacts']

  Contact.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Contacts were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all contacts.',
      });
    });
};

module.exports = {
  getAllContacts,
  getSingleContact,
  updateSingleContact,
  deleteAllContacts,
  deleteSingleContact,
  addContact,
};
