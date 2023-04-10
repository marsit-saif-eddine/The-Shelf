
const Event = require("../../models/event");
const user=require("../../models/user")
var mongoose = require('mongoose');
const express = require('express');
const { validationResult } = require('express-validator');

const router = express.Router();


// Get all events

exports.getallevents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get an event by ID

exports.geteventsbyid= async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new event
exports.addEvent = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
 
    const { name, startDate,endDate, description, location ,img} = req.body;
   const updatepath=await img.split('//').join('/');
   console.log(updatepath)
    const event = new Event({
      name,
      startDate,
      endDate,
      description,
      location,
      participants: [],
      image: updatepath,


    });
console.log(event)
    await event.save();

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// exports.addevents=async (req, res) => {
//   const event = new Event({
//     name: req.body.name,
//     description: req.body.description,
//     startDate: req.body.startDate,
//     endDate: req.body.endDate,
//     location: req.body.location
//   });
//   try {
//     const newEvent = await event.save();
//     res.status(201).json(newEvent);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }};
// Update an event by ID
exports.updateEvent = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// exports.updateevents=async (req, res) => {
//   try {
//     const { id } = req.params;
//     const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
//     res.json(event);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// Delete an event by ID

exports.deleteevents=async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//participate

exports.participateEvent = async (req, res) => {
  const userId = req.query.id;

  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send({ message: 'Event not found' });
    }

    if (event.participants.includes(userId)) {
      return res.status(409).send({ message: 'User is already participating in this event' });
    }

    event.participants.push(userId);
    await event.save();

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//unparticipate

exports.unparticipateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send({ message: 'Event not found' });
    }

    if (!event.participants.includes(req.user._id)) {
      return res.status(409).send({ message: 'User is not currently participating in this event' });
    }

    event.participants = event.participants.filter(p => p !== req.user._id);
    await event.save();

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//report event 
exports.reportEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send({ message: 'Event not found' });
    }
event.reported
    event.reported = true;
    await event.save();

    res.status(200).send({ message: 'Event reported successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};





















// const Event = require("../models/event.js");
// const jwt = require('jsonwebtoken');
// const bcrypt = require("bcryptjs");
// const { validationResult } = require('express-validator');
// var mongoose = require('mongoose');
// app.post('/api/upload-by-link', async (req,res) => {
//     const {link} = req.body;
//     const newName = 'photo' + Date.now() + '.jpg';
//     await imageDownloader.image({
//       url: link,
//       dest: '/tmp/' +newName,
//     });
//     const url = await uploadToS3('/tmp/' +newName, newName, mime.lookup('/tmp/' +newName));
//     res.json(url);
//   });
  
//   const photosMiddleware = multer({dest:'/tmp'});
//   app.post('/api/upload', photosMiddleware.array('photos', 100), async (req,res) => {
//     const uploadedFiles = [];
//     for (let i = 0; i < req.files.length; i++) {
//       const {path,originalname,mimetype} = req.files[i];
//       const url = await uploadToS3(path, originalname, mimetype);
//       uploadedFiles.push(url);
//     }
//     res.json(uploadedFiles);
//   });
  

  
// app.post('/api/upload', photosMiddleware.array('photos', 100), async (req,res) => {
//   const uploadedFiles = [];
//   for (let i = 0; i < req.files.length; i++) {
//     const {path,originalname,mimetype} = req.files[i];
//     const url = await uploadToS3(path, originalname, mimetype);
//     uploadedFiles.push(url);
//   }
//   res.json(uploadedFiles);
// });
  
//   app.get('/api/user-events', (req,res) => {
//     mongoose.connect(process.env.DBADDRESS);
//     const {token} = req.cookies;
//     jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//       const {id} = userData;
//       res.json( await Place.find({owner:id}) );
//     });
//   });
  
//   app.get('/api/events/:id', async (req,res) => {
//     mongoose.connect(process.env.DBADDRESS);
//     const {id} = req.params;
//     res.json(await Place.findById(id));
//   });
  
//   app.put('/api/events', async (req,res) => {
//     mongoose.connect(process.env.DBADDRESS);
//     const {token} = req.cookies;
//     const {
//       id, title,address,addedPhotos,description,
//       perks,extraInfo,checkIn,checkOut,maxGuests,price,
//     } = req.body;
//     jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//       if (err) throw err;
//       const placeDoc = await Place.findById(id);
//       if (userData.id === placeDoc.owner.toString()) {
//         placeDoc.set({
//           title,address,photos:addedPhotos,description,
//           perks,extraInfo,checkIn,checkOut,maxGuests,price,
//         });
//         await placeDoc.save();
//         res.json('ok');
//       }
//     });
//   });
  
//   app.get('/api/events', async (req,res) => {
//     mongoose.connect(process.env.DBADDRESS);
//     res.json( await Place.find() );
//   });
 
// async function uploadToS3(path, originalFilename, mimetype) {
//   const client = new S3Client({
//     region: 'us-east-1',
//     credentials: {
//       accessKeyId: process.env.S3_ACCESS_KEY,
//       secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//     },
//   });
//   const parts = originalFilename.split('.');
//   const ext = parts[parts.length - 1];
//   const newFilename = Date.now() + '.' + ext;
//   await client.send(new PutObjectCommand({
//     Bucket: bucket,
//     Body: fs.readFileSync(path),
//     Key: newFilename,
//     ContentType: mimetype,
//     ACL: 'public-read',
//   }));
//   return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
// }




// const express = require('express');
// const router = express.Router();
// const Event = require('../models/event');

// // Get all events
// router.get('/', async (req, res) => {
//   try {
//     const events = await Event.find();
//     res.json(events);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// const bodyParser = require('body-parser');

// app.use(bodyParser.json());

// app.post('/api/events', (req, res) => {
//   const { name, description, startDate, endDate, location } = req.body;

//   // Here, you could save the new event to your database or do any other necessary processing
//   // For example:
//   const newEvent = {
//     name,
//     description,
//     startDate,
//     endDate,
//     location,
//   };

//   res.status(201).json(newEvent);
// });


// // Update an event by ID
// router.put('/:id', async (req, res) => {
//     try {
//       const { id } = req.params;
//       const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
//       res.json(event);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
  
//   app.listen(5000, () => {
//     console.log('Server started on port 5000');
//   });
// module.exports = router;
