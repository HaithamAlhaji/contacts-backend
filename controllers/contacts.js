const asyncHandler = require("express-async-handler");
const Contact = require("../models/contact");

/*
    @desc Get all contacts
    @route GET /api/contacts/
    @access private
*/
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user._id });
  res.status(200).json(contacts).end();
});

/*
    @desc Get a contact
    @route GET /api/contacts/:id
    @access private
*/
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact).end();
});

/*
    @desc Update a contact
    @route PUT /api/contacts/:id
    @access private
*/
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("No contact related to update");
  }
  console.log(contact.user_id);
  console.log(req.user._id);
  if (contact.user_id.toString() !== req.user._id) {
    res.status(403);
    throw new Error("User doesn't have authorization to update");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact).end();
});

/*
    @desc Delete a contact
    @route DELETE /api/contacts/:id
    @access private
*/
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("No contact related to delete");
  }
  if (contact.user_id.toString() !== req.user._id) {
    res.status(403);
    throw new Error("User doesn't have authorization to delete");
  }

  const deletedContect = await Contact.deleteOne({ _id: req.params.id });

  res.status(200).json(deletedContect);
});

/*
    @desc Create new contact
    @route POST /api/contacts/:id
    @access private
*/
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw Error("All fields are required");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user._id,
  });
  res.status(201).json(contact).end();
});

module.exports = {
  getContacts,
  getContact,
  updateContact,
  deleteContact,
  createContact,
};
