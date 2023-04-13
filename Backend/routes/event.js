var express = require('express');
const { body,param  } = require('express-validator');
var router = express.Router();
const eventController = require('../controllers/event-management/event')
const multer=require('multer')
const path= require('path')
const {requireAuth} = require("../middleware/auth");
const {authorize} = require('../middleware/authorize');
const middlewareupload= require('../middleware/uploadimage')
const Review = require('../models/reviewSchema');
const {validateEvent}= require('../middleware/validateEvent');
const event = require('../models/event');


router.get("/",eventController.getallevents);
router.get('/detail/:id', eventController.geteventsbyid);
router.post('/add',eventController.addEvent,(req,res)=>{
    console.log(upload)
})
//router.get('/eventsdetail/:id', eventController.geteventsbyid);

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
  router.put('/update/:id',middlewareupload.uploadPhotoMiddlewareUpdate,validateEvent,eventController.updateEvent
  );
  router.delete("/delete/:id",eventController.deleteevents);

router.post("/participate/:id",eventController.participateEvent);

router.post("/unparticipate/:id",authorize(["user"]), eventController.unparticipateEvent);

router.post('/report/:id', eventController.reportEvent);


// Get all reviews for an event by event ID
router.get('/:id/reviews', eventController.reviews);
// Create a new review for an event by event ID
router.post('/:id/reviews',eventController.reviewadd );

// Delete a review for an event by event ID and review ID
router.delete('/:eventId/reviews/:reviewId',eventController.reviewdelete);



router.post('/events/favorite', authorize(["user"]), async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.favoriteEvents.includes(eventId)) {
      user.favoriteEvents.push(eventId);
      await user.save();
    }

    res.status(200).json({ message: 'Event added to favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/search', async (req, res) => {
  const searchText = req.query.query;
if (!searchText) {
  res.status(400).json({ message: 'Query parameter is required' });
} else {
  const regex = new RegExp(searchText, 'i');
  try {
    const events = await event.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        { location: { $regex: regex } }
      ],
    });
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve offers' });
  }
}
});  



module.exports = router