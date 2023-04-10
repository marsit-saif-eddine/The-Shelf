const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  participants: [],
  image: { type: String }// new image field,


});

module.exports = mongoose.model('Event', eventSchema);


// var mongoose = require('mongoose');



// const eventSchema= new mongoose.Schema({


//     owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
//     title:String,
//     addres:String,
//     photos:[String],
//     description: String,
//     perks:[String],
//     extraInfo:String,
//     checkIn:Number,
//     checkOut:Number,
//     maxGuests:Number,


// });
// const EventModel= mongoose.model('Event',eventSchema);

// module.exports=EventModel;


