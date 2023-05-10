// var express = require("express");
// const router = express.Router();
// const booksController = require("../../controllers/book-management/bookController");
// //const middlewareuploader = require('../../middleware/uploadimage');



// router.get("/books", booksController.getAllBooks);
// router.post("/addbook", booksController.addBook);
// router.get("/:id", booksController.getById);
// router.put("/:id", booksController.updateBook);
// router.delete("/:id", booksController.deleteBook);
// router.get("/accepted_books", booksController.getAcceptedBooks);
// router.get("/user_book/:id", booksController.getByUserId);
// router.get("/filter_books", booksController.getAllBooksFilter);
// router.put("/switch_accepted/:id", booksController.switchBookToaccepted);


// module.exports = router;


const express = require("express");
const router = express.Router();
//const Book = require("../../../../models/book.js");
const booksController = require("../../controllers/book-management/bookController");
//const middlewareuploader = require('../../middleware/uploadimage');
const upload= require ('../../middleware/multer-config');
const uploadController = require('../../controllers/book-management/upload-controller');


router.get("/searchForBook", booksController.searchForBook);
router.get("/books", booksController.getAllBooks);
router.get("/filter_books", booksController.getAllBooksFilter);
router.get("/accepted_books", booksController.getAcceptedBooks);
router.get("/user_filter_books", booksController.getUserBooksFilter);
//router.get("/user_filter_books", booksController.getUserBooksFilter);
//router.post("/addbook", upload.single('image'), booksController.addBook);
router.post("/addbook", booksController.addBook);
router.get("/book_author/", booksController.getByAuthor);
router.get("/someBooks", booksController.getSomeBooks);
router.get("/:id", booksController.getById);
router.put("/:id", booksController.updateBook);
router.delete("/:id", booksController.deleteBook);
router.get("/books_genre", booksController.getByGenre);
router.put("/switch_accepted/:id", booksController.switchBookToaccepted);
router.get("/user_book/:id", booksController.getByUserId);



module.exports = router;