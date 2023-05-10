var GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require("../../models/user.js")
//const passport = require('passport');


module.exports=(passport)=>{
    passport.serializeUser(function (user, done) {
      console.log(user)
        done(null, user.id);
      });
      passport.deserializeUser(function (id, done) {
        userModel.findById(id, function (err, user) {
          console.log(user)
          done(err, user);
        });
      });
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    accessType: 'offline',
    prompt: 'consent'
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      
      let user = await userModel.findOne({ googleId: profile.id });
      if (user) {
        if (user.status === 'banned') {
          return cb("Your account is banned. Please contact the admin!" )
      }
        // Update the user with the new access token and profile information
        const updatedUser = {
          firstname: profile.name.givenName,
          lastname: profile.name.familyName,
          email: profile.emails[0].value,
          profile_photo: profile.photos[0].value,
          secret: accessToken,
          // role: "client",
          // ability: [
          //   {
          //     action: 'read',
          //     subject: 'ACL'
          //   },
          //   {
          //     action: 'read',
          //     subject: 'Auth'
          //   },
          //   {
          //     action: 'client',
          //     subject: 'client'
          //   }
          // ],
          
          isConfirmed:true,
          username:`${profile.name.givenName} ${profile.name.familyName}`
        };
        let result = await userModel.findOneAndUpdate(
          { _id: user.id },
          { $set: updatedUser },
          { new: true }
        );
        return cb(null, {
          id: result._id,
          email: result.email,
          firstName: result.firstname,
          lastName: result.lastname,
          role: result.role,
          ability: result.ability,
          accessToken: accessToken,
          refreshToken: refreshToken,
          username:result.username,
          profile_photo:result.profile_photo
        });
      } else {
        // Create a new user with the Google profile information
        const newUser = new userModel({
          googleId: profile.id,
          firstname: profile.name.givenName,
          lastname: profile.name.familyName,
          email: profile.emails[0].value,
          profile_photo: profile.photos[0].value,
          role: "client",
          ability: [
            {
              action: 'read',
              subject: 'ACL'
            },
            {
              action: 'read',
              subject: 'Auth'
            },
            {
              action: 'client',
              subject: 'client'
            }
          ],
          status:'active',
          isConfirmed:true,
          username:`${profile.name.givenName} ${profile.name.familyName}`
        });
        let result = await newUser.save();
        
        return cb(null, {
          id: result._id,
          email: result.email,
          firstName: result.firstname,
          lastName: result.lastname,
          role: result.role,
          ability: result.ability,
          accessToken: accessToken,
          refreshToken: refreshToken,
          username:result.username,
          profile_photo:result.profile_photo
        });
      }
    } catch (err) {
      return cb(err, null);
    }
}
)
);
};
