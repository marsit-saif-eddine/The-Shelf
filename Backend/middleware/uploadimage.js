// Require the necessary modules
const multer = require("multer");
const path = require("path");

// Set up the multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // set the destination folder for the uploaded files
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
    },
    limits: { fileSize: 1024 * 1024 }, // set the maximum file size to 1 MB
  });
  // Define the middleware function that handles the file upload and passes the URL to the service
  const uploadPhotoMiddleware = (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (!req.file) {
        return res.status(400).json({ error: "No file provided" });
      }
      req.body.img = req.file.path; // set the service_logo field of the request body to the uploaded file path
      next();
    })}
  const uploadPhotoMiddlewareUpdate = (req, res, next) => {
      upload.single("image")(req, res, (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        if (req.file) {
          req.body.img = req.file.path; // set the service_logo field of the request body to the uploaded file path
        }
        next();
      });
    };
  // Export the middleware function
  module.exports = {uploadPhotoMiddleware,uploadPhotoMiddlewareUpdate}