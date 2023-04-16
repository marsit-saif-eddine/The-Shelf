const Book = require("../../models/book.js")

const getAllBooks = async (req, res, next) => {

  let books;
  try {
 books = await Book.find();
  //  books = await Book.find().where(accepted==true);
  } catch (err) {
    console.log(err);
  }

  if (!books) {
    return res.status(404).json({ message: "No books found" });
  }
  return res.status(200).json(books);
};


const getAllBooksFilter = async (req, res) => {
  try {
    // Extract the query parameters from the request
    const { q, sortColumn, sort, page, perPage, accepted, available } = req.query;
       // Create the filter object based on the query parameters
       const filter = {};
       if (q) {
         filter.$or = [  
             { name: new RegExp(q, 'i') },    
             { author: new RegExp(q, 'i') },  
         ];
       }
       if (accepted) {
         filter.accepted = accepted;
       }
       if (available) {
         filter.available = available;
       }

    // Set the sort order based on the query parameters
    const sortOrder = {};
    if (sortColumn) {
      sortOrder[sortColumn] = sort === 'desc' ? -1 : 1;
    }

    // Query the database for matching users and calculate pagination variables
    const totalBooks = await Book.countDocuments(filter);
    const totalPages = Math.ceil(totalBooks / perPage);
    const books = await Book.find(filter)
      .sort(sortOrder)
      .skip((page - 1) * perPage)
      .limit(perPage);
      let profiles = [];
      books.map(book => {
          let profile = {
              ...book
          }
          profile = {
              ...profile['_doc'],
          };
          profiles.push(profile);
      });

     // Return the response as a JSON object
     res.json({ books: profiles, total:totalBooks , perPage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };


/*const getAllBooks = async (req, res, next) => {
  try {
    // Extract the query parameters from the request
    const { q, sortColumn, sort, page, perPage, accepted, state } = req.query;

    // Create the filter object based on the query parameters
    const filter = {};
    if (q) {
      filter.$or = [  
          { name: new RegExp(q, 'i') },    
          { author: new RegExp(q, 'i') },  
      ];
    }
    if (accepted) {
      filter.accepted = accepted;
    }
    if (state) {
      filter.state = state;
    }

    // Set the sort order based on the query parameters
    const sortOrder = {};
    if (sortColumn) {
      sortOrder[sortColumn] = sort === 'desc' ? -1 : 1;
    }

    // Query the database for matching users and calculate pagination variables
    const totalBooks = await Book.countDocuments(filter);
    const totalPages = Math.ceil(totalBooks / perPage);
    const books = await Book.find(filter)
      .sort(sortOrder)
      .skip((page - 1) * perPage)
      .limit(perPage);

      let profiles = [];
      books.map(book => {
          let profile = {
              ...book
          }
          profile = {
              ...profile['_doc'],
          };
          profiles.push(profile);
      });

    // Return the response as a JSON object
    res.json({ books: profiles, total:totalBooks , perPage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};*/


const getAcceptedBooks = async (req, res, next) => {
  let books;
  try {
 books = await Book.find({accepted:true});
console.log('this is booklist',books)
  } catch (err) {
    console.log(err);
  }

  if (!books) {
    return res.status(404).json({ message: "No books found" });
  }
  return res.status(200).json({books});
};


const getById = async (req, res, next) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "No Book found" });
  }
  return res.status(200).json({book} );
};

const getByUserId = async (req, res, next) => {
  let books;
  const id = req.params.id;
  try {
 books = await Book.find({owner_Id : id});
console.log('My booklist',books)
  } catch (err) {
    console.log(err);
  }

  if (!books) {
    return res.status(404).json({ message: "No books found" });
  }
  return res.status(200).json(books);
};

const addBook = async (req, res, next) => {
  const { name, author, description, price, available, image, for_sale, owner, owner_Id,accepted } = req.body;
  let book;
  try {
    book = new Book({
      name,
      author,
      description,
      price,
      available,
      image,
      for_sale,
      owner,
      owner_Id,
      accepted
    });
    await book.save();
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(500).json({ message: "Unable To Add" });
  }
  return res.status(201).json({book} );
};

const updateBook = async (req, res, next) => {
  const id = req.params.id;
  const { name, author, description, price, available, image } = req.body;
  let book;
  try {
    book = await Book.findByIdAndUpdate(id, {
      name,
      author,
      description,
      price,
      available,
      image,
    });
    book = await book.save();
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "Unable To Update By this ID" });
  }
  return res.status(200).json( {book} );
};
const switchBookToaccepted = async (req, res, next) => {
  const id = req.params.id;
  const { accepted} = req.body;
  let book;
  try {
    book = await Book.findByIdAndUpdate(id, {
      accepted
    });
    book = await book.save();
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "Unable To Update By this ID" });
  }
  return res.status(200).json( {book} );
};

const deleteBook = async (req, res, next) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "Unable To Delete By this ID" });
  }
  return res.status(200).json({ message: "Product Successfully Deleted" });
};

exports.getAllBooks = getAllBooks;
exports.getAcceptedBooks = getAcceptedBooks;
exports.getAllBooksFilter= getAllBooksFilter;
exports.addBook = addBook;
exports.getById = getById;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
exports.switchBookToaccepted = switchBookToaccepted;
exports.getByUserId = getByUserId;

