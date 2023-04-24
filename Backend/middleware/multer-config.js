/*const bcrypt = require("bcryptjs");
const user = require("../models/user");
const multer = require("multer")
const diskStorage = require("multer")
const join= require("path")
const dirname= require("path")
const extname= require("path")
const fileURLToPath = require("url")*/
const multer= require("multer");
const {join, dirname, extname} = require("path");
const {fileURLToPath} = require("url");
const uuidv4 = require("uuid/v4");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload/bookimg/')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, uuidv4() + "-" + fileName);
    }
  })

  
  const uploadClubLogo = (req, res, next) => {
    upload.single("imgCover")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      req.body = JSON.parse(req.body.club);
      if (req.file) {
        req.body.logo = req.file.path; // set the service_logo field of the request body to the uploaded file path
      } else {
        req.body.logo = 'uploads/avatars/club_logo.png';
      }
      next();
    });
  };
  
  const upload = multer({ storage: storage })
  module.exports= upload