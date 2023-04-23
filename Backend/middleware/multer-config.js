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
  
  const upload = multer({ storage: storage })
  module.exports= upload