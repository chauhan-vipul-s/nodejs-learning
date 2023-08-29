// import asynch handler
const asyncHandler = require("express-async-handler");
// wrap all function with this handler
// whenever exception was occured this handler will handle it

// need to import schema after model work
const Contacts = require("../models/contectModel");

// ------
// in mongoose it returns a promise so add async in all functions
// need to add asynch handler in alter to try catch and error handling in mongoose
// refer a readme now
// ------

// @desc get all contacts
// @route GET /api/contacts
// @access private
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contacts.find({ user_id: req.user.id });
  // establish connection between database and controller
  res.status(200).json(contacts);
});

// @desc post contacts
// @route POST /api/contacts
// @access private
const postContact = asyncHandler(async (req, res) => {
  // we cannot access a directly body
  // need to setup a middleware to read a body
  // which was in the server.js

  // Error handling
  const { name, email, phone } = req.body;
  // console.log(name, email, phone);
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!!");
    // this error was not in the format of the json
    // for this need to create custom a middleware
    // goto middleware/errorHandler.js
  }

  const contact = await Contacts.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// @desc get contact by id
// @route GET /api/contacts/:id
// @access private
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// @desc put contacts
// @route PUT /api/contacts/:id
// @access private
const putContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permissio to update other user contacts.");
  }

  const updatedContact = await Contacts.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

// @desc delte contacts
// @route PUT /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permissio to update other user contacts.");
  }

  await Contacts.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getAllContacts,
  postContact,
  getContactById,
  putContact,
  deleteContact,
};
