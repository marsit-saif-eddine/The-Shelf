var express = require('express');
const { body,param  } = require('express-validator');
var router = express.Router();
const eventController = require('../controllers/event-management/event')
const multer=require('multer')
const path= require('path')
const {requireAuth} = require("../middleware/auth");
const {authorize} = require('../middleware/authorize');
const middlewareupload= require('../middleware/uploadimage')
// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'./upload/')
//     },
//     __filename:(req,file,e)=>{
//         console.log(file,'!!!!!!!this'+file);
//         e(
//             null,
//             new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
//           ); // set the filename for the uploaded files    }
// }
// })
// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//       const ext = path.extname(file.originalname).toLowerCase();
//       console.log(ext)
//       if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".svg") {
//         cb(new Error("Only JPG, JPEG and PNG files are allowed"));
//       } else {
//         cb(null, true);
//       }
//     },
//     limits: { fileSize: 1024 * 1024 }, // set the maximum file size to 1 MB
//   });

router.get("/",eventController.getallevents);
router.get("/:id",eventController.geteventsbyid);
// router.post('/add', upload.single('image'), (req, res) => {
//     if (req.file) {
//       const { name, startDate, endDate, description, location } = req.body;
//       const imagePath = req.file.path;
  
//       // Create a new event object with the uploaded image path
//       const event = new Event({
//         name,
//         startDate,
//         endDate,
//         description,
//         location,
//         image: imagePath, // Add the image path to the event object
//         participants: []
//       });
  
//       // Save the event to the database
//       event.save((err, result) => {
//         if (err) {
//           console.log(err);
//           res.status(500).send('Error saving event');
//         } else {
//           console.log(result);
//           res.status(200).send('Event saved successfully');
//         }
//       });
//     } else {
//         console.log(req.file)

//       res.status(400).send('No image uploaded');
//     }
//   });

router.post('/add',middlewareupload.uploadPhotoMiddleware,eventController.addEvent,(req,res)=>{
    console.log(upload)
})
// router.post(
//     '/add',upload.single('image'),
//     [
//       body('name')
//         .notEmpty().withMessage('Title is required')
//         .isLength({ max: 50 ,min:5}).withMessage('Title must be less than 50 characters'),
//       body('startDate')
//         .notEmpty().withMessage('Date is required')
//         .isISO8601().withMessage('Date must be in ISO8601 format'),
//         body('endDate')
//         .notEmpty().withMessage('Date is required')
//         .isISO8601().withMessage('Date must be in ISO8601 format'),
//       body('description')
//         .notEmpty().withMessage('Description is required')
//         .isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
//       body('location')
//         .notEmpty().withMessage('Location is required')
//         .isLength({ max: 50 }).withMessage('Location must be less than 50 characters'),
//     ],
//     eventController.addEvent
//   );
  router.put(
    '/update/:id',
    [
      param('id')
        .isMongoId().withMessage('Invalid event ID'),
      body('name')
        .if((value, { req }) => req.body.name)
        .notEmpty().withMessage('Title is required')
        .isLength({ max: 50 ,min:3 }).withMessage('Title must be less than 50 characters'),
      body('startDate')
        .if((value, { req }) => req.body.startDate)
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Date must be in ISO8601 format'),
        body('endDate')
        .if((value, { req }) => req.body.endDate)
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Date must be in ISO8601 format'),
      body('description')
        .if((value, { req }) => req.body.description)
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 500,min:10 }).withMessage('Description must be less than 500 characters'),
      body('location')
        .if((value, { req }) => req.body.location)
        .notEmpty().withMessage('Location is required')
        .isLength({ max: 50 }).withMessage('Location must be less than 50 characters'),
    ],
    eventController.updateEvent
  );router.delete("/delete/:id",eventController.deleteevents);

router.post("/participate/:id",eventController.participateEvent);
router.post("/unparticipate/:id",authorize(["user"]), eventController.unparticipateEvent);

router.post('/report/:id', eventController.reportEvent);






module.exports = router