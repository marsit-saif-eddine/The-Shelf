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


  const getUserBooksFilter = async (req, res) => {
    try {
      // Extract the query parameters from the request
      const { q, sortColumn, sort, page, perPage, genre } = req.query;
         // Create the filter object based on the query parameters
         const filter = {};
         if (q) {
           filter.$or = [  
               { name: new RegExp(q, 'i') },    
               { author: new RegExp(q, 'i') },  
           ];
         }
         if (genre) {
           filter.genre = genre;
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



  // const getUserBooksFilter = async (req,res,next) => 
  // {
  //   try {
  //     const page = parseInt(req.query.page) - 1 || 0;
  //     const limit = parseInt(req.query.limit) || 5;
  //     const search = req.query.search || "";
  //     let sort = req.query.sort || "rating";
  //     let genre = req.query.genre || "All";
  
  //     const genreOptions = [
  //       "Action",
  //       "Romance",
  //       "Fantasy",
  //       "Drama",
  //       "Crime",
  //       "Adventure",
  //       "Thriller",
  //       "Sci-fi",
  //       "Music",
  //       "Family",
  //     ];
  
  //     genre === "All"
  //       ? (genre = [...genreOptions])
  //       : (genre = req.query.genre.split(","));
  //     req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
  
  //     let sortBy = {};
  //     if (sort[1]) {
  //       sortBy[sort[0]] = sort[1];
  //     } else {
  //       sortBy[sort[0]] = "asc";
  //     }
  
  //     const books = await Book.find({ name: { $regex: search, $options: "i" } })
  //       .where("genre")
  //       .in([...genre])
  //       .sort(sortBy)
  //       .skip(page * limit)
  //       .limit(limit);
  
  //     const total = await Book.countDocuments({
  //       genre: { $in: [...genre] },
  //       name: { $regex: search, $options: "i" },
  //     });
  
  //     const response = {
  //       error: false,
  //       total,
  //       page: page + 1,
  //       limit,
  //       genres: genreOptions,
  //       books,
  //     };
  
  //     res.status(200).json(response);
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json({ error: true, message: "Internal Server Error" });
  //   }
  // };
  

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
  return res.status(200).json(books);
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

const getByAuthor = async (req, res, next) => {
  const authorName = req.query.author;
  let books;
  
  try {
  books = await Book.find({author : authorName});
  console.log('My booklist',books)
  } catch (err) {
    console.log(err);
  }

  if (!books) {
    return res.status(404).json({ message: "No books found" });
  }
  return res.status(200).json(books);
};

const getByGenre = async (req, res, next) => {
  const genre = req.query.genre;
  let books;
  try {
  books = await Book.find({genre : genre});
  
  } catch (err) {
    console.log(err);
  }
  if (!books) {
    return res.status(404).json({ message: "No books found" });
  }
  return res.status(200).json(books);
};

const getByName = async (req, res, next) => {
  const name = req.query.name;
  let books;
  try {
  books = await Book.find({name : name});

  } catch (err) {
    console.log(err);
  }
  if (!books) {
    return res.status(404).json({ message: "No books found" });
  }
  return res.status(200).json(books);
};

// const getBySearch = async (req, res, next) => {
//   const search = req.query;
//   const query = search ? { $text: { $search: search } } : {};
//   Book.find(query, (err, books) => {
//     if (err) return res.status(500).send(err);
//     res.send(books);
//   });
// }

const addBook = async (req, res, next) => {
  const { name, image, author, description, price, available, for_sale, owner, owner_Id, accepted, genre} = req.body;
  let book;
  try {
    book = new Book({
      name,
      author,
      description,
      price,
      available,
      image,
      // image: req.protocol + "://" + req.get("host") + "/upload/bookimg/" + req.file,
      for_sale,
      owner,
      owner_Id,
      accepted,
      genre
    });
    await book.save();
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(500).json({ message: "Unable To Add" });
  }
  console.log('this is img with bookkk', book);
  return res.status(201).json({book} );
};

const updateBook = async (req, res, next) => {
  const id = req.params.id;
  const { name, author, description, price, available, image, genre } = req.body;
  let book;
  try {
    book = await Book.findByIdAndUpdate(id, {
      name,
      author,
      description,
      price,
      available,
      image,
      genre
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

const getSomeBooks = async (req, res, next) => {
  let books;
  try {
    books = await Book.find().limit(6);
    
    if (!books) {
    return res.status(404).json({ message: "No Books found" });
  }
  } catch (err) {
    console.log(err);
  }

  
  return res.status(200).json(books);
};





exports.getSomeBooks = getSomeBooks;
exports.getAllBooks = getAllBooks;
exports.getAcceptedBooks = getAcceptedBooks;
exports.getAllBooksFilter= getAllBooksFilter;
exports.addBook = addBook;
exports.getById = getById;
exports.getByAuthor = getByAuthor;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
exports.switchBookToaccepted = switchBookToaccepted;
exports.getByUserId = getByUserId;
exports.getByGenre = getByGenre;
exports.getByName = getByName;
//exports.getBySearch = getBySearch;
exports.getUserBooksFilter = getUserBooksFilter;