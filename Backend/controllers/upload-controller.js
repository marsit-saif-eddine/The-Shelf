const multer = require("multer");
const ObjectID = require("mongodb").ObjectId;
const path = require("path");

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "./uploads/avatars");
  },
  filename: function (req, file, cb) {
    req.body.user = JSON.parse(req.body.user);
    if (!req.body.user._id) {
      req.body.user._id = new ObjectID();
    }
    const extension = file.originalname.substring(
      file.originalname.lastIndexOf(".") + 1
    );
    const fileName = `${req.body.user._id.toString()}.${extension}`;

    req.body.user.photo = fileName;

    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports = {
  upload
};
