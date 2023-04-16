/* var express = require('express');
const { body } = require('express-validator');
const user = require('../../models/user.js')
var router = express.Router();

module.exports = router */


const express = require("express");
const router = express.Router();
//const Book = require("../../../../models/book.js");
const booksController = require("../../controllers/book_management/bookController");
//const middlewareuploader = require('../../middleware/uploadimage');

router.get("/books", booksController.getAllBooks);
router.get("/filter_books", booksController.getAllBooksFilter);
router.get("/accepted_books", booksController.getAcceptedBooks);
router.post("/addbook", booksController.addBook);
router.get("/:id", booksController.getById);
router.put("/:id", booksController.updateBook);
router.delete("/:id", booksController.deleteBook);
router.put("/switch_accepted/:id", booksController.switchBookToaccepted);
router.get("/user_book/:id", booksController.getByUserId);





//adminbooks
//router.get("/books", booksController.getAllBook);

module.exports = router;