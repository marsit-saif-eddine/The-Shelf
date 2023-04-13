
const Event = require("../../models/event");
const user=require("../../models/user")
const Review = require('../../models/reviewSchema');

var mongoose = require('mongoose');
const express = require('express');
const { validationResult } = require('express-validator');

const router = express.Router();


// Get all events

exports.getallevents = async (req, res) => {
  try {
    const {userconnected}=req.query
    const filter={}
    if(userconnected){
      filter.owner=userconnected
    }
    const events = await Event.find(filter);
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get an event by ID

exports.geteventsbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).populate('reviews');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
    console.log(event)
  } catch (err) {
    console.error(err); // Use `err` instead of `error`
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
 
    const { name, startDate,endDate, description, location ,img,owner} = req.body;
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
      owner


    });
console.log(event)
    await event.save();

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


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
// exports.participateEvent = async (req, res) => {
//   const userId = req.query._id;
//   const eventId = req.params.id;

//   try {
//     // Check if the user is authenticated
//     if (!req.user) {
//       return res.status(401).json({ message: 'Authentication required' });
//     }

//     // Check if the user has the necessary permissions
//     const event = await Event.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     if (event.owner.toString() === userId) {
//       return res.status(409).json({ message: 'Owner cannot participate in their own event' });
//     }
//     if (event.participants.includes(userId)) {
//       return res.status(409).json({ message: 'User is already participating in this event' });
//     }

//     // Add the user to the event's participants
//     event.participants.push(userId);
//     await event.save();

//     res.status(200).json(event);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
//participate
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
exports.reviewadd = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    console.log(event._id)
    const review = new Review({
      eventId: req.params.id,
      comment: req.body.comment.comment,
      rating: req.body.comment.rating,
    });
    await review.save();
    event.reviews.push(review._id); // add the review's _id to the reviews array of the associated event
    await event.save(); // save the updated event
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.reviews=async (req, res) => {
  try {
    const reviews = await Review.find({ eventId: req.params.id });
    res.json({ data: reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.reviewdelete=async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const review = await Review.findOneAndDelete({
      _id: req.params.reviewId,
      event: event,
    });
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Review deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




