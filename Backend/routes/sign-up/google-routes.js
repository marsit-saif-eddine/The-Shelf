const router = require('express').Router();
const passport = require('passport');
require('../../controllers/user-management/google-auth');




router.get('/', (req, res) => {
    res.send("<button><a href='/auth/google'>Login With Google</a></button>")
    });


    router.get(
        "/auth/google",
        passport.authenticate("google", { scope: ["profile", "email"] })
      );
      
      router.get(
        "/auth/google/callback",
        passport.authenticate("google", {
          failureRedirect: "http://localhost:3000/login",
        }),
        function (req, res) {
          const userData = {
            id: req.user.id,
            email: req.user.email,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            role: req.user.role,
            ability: req.user.ability,
            username:req.user.username,
            avatar:req.user.profile_photo
          };
          res.redirect(
            `http://localhost:3000/login?userData=${JSON.stringify(userData)}&accessToken=${req.user.accessToken}&refreshToken=${req.user.refreshToken}`
          );
           //console.log(profile)
        ///  );
        }
      );
    // router.get('/auth/google/callback', 
    // passport.authenticate('google', { failureRedirect: '/error' }),
    // function(req, res) {
    //   // Successful authentication, redirect success.
    //   res.redirect('/success');
    // });
 




  module.exports = router;

