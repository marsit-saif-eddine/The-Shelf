/* var express = require('express');
const { body } = require('express-validator');
const user = require('../../models/user.js')
var router = express.Router();

module.exports = router */

const express = require("express");
const router = express.Router();
//const Book = require("../../../../models/book.js");
const booksController = require("../../controllers/book_management/bookController");

router.get("/books", booksController.getAllBooks);
router.post("/addbook", booksController.addBook);
router.get("/:id", booksController.getById);
router.put("/:id", booksController.updateBook);
router.delete("/:id", booksController.deleteBook);

module.exports = router;