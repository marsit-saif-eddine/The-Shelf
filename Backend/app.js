const express = require("express");
const logger = require("morgan");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const chatRouter = require("./routes/chat/chat.js")
const userssRouter = require("./routes/user.js");
const eventsRouter= require("./routes/event");
const quizRouter = require("./routes/quiz/quiz.js");

const booksRouter = require("./routes/book/book.js");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dbo = require("./services/database/connection");
const passport = require('passport');
const session = require("express-session");
const path= require('path')
app.use(passport.initialize());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
require('./controllers/user-management/google-auth')(passport);

//app.use(passport.initialize());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);



const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = require("http-proxy-middleware");
const user = require("./models/user.js");
const book = require("./models/book.js");
const quiz = require("./models/quiz.js");
//const book = require("../../models/book.js");


app.use(logger('dev'));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

////// BEGIN ROUTES ///////
const signUpRoutes = require("./routes/sign-up/sign-up");
app.use("/signUp",signUpRoutes);
app.use("/user",userssRouter);
app.use("/events",eventsRouter)
app.use("/book",booksRouter);
app.use("/quiz",quizRouter);
app.use("/appChat",chatRouter);



const googleRoutes = require("./routes/sign-up/google-routes");
app.use("/", googleRoutes);


////// END ROUTES ///////


//connect to db
dbo.connectToDB((err) => {
  if (err) {
    console.log(err);
  }
});

mongoose
  .connect(process.env.DBADDRESS)
  .then((res) => {
    console.log("mongodb connected!!");
  })
  .catch((err) => {
    console.log(err.message);
  });

  

//mongoose.connect(dbconfig.mongo.uri)


module.exports = app;
