// Require the necessary modules
const multer = require("multer");
const path = require("path");

// Set up the multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/bookimg/" ); // set the destination folder for the uploaded files
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    ); // set the filename for the uploaded files
  },
});
// Set up the multer upload instance
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".svg") {
        cb(new Error("Only JPG, JPEG and PNG files are allowed"));
      } else {
        cb(null, true);
      }
    }
});


    const uploadBookCover = (req, res, next) => {
      upload.single("img")(req, res, (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        req.body = JSON.parse(req.body.user);
        if (req.file) {
          req.body.profile_photo = req.file.path; // set the service_logo field of the request body to the uploaded file path
        } else {
          req.body.profile_photo = 'uploads/avatars/avatar.svg';
        }
        next();
      });
    };
  // Export the middleware function
  module.exports = {uploadBookCover}