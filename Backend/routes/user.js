var express = require('express');
const { body } = require('express-validator');

var router = express.Router();

const userController = require('../controllers/user');
const {requireAuth} = require("../middleware/auth");
const {authorize} = require('../middleware/authorize');


router.post('/signIn', userController.login)
router.get('/signOut', requireAuth,userController.logout)
router.post('/refreshToken', userController.refreshToken)



////////////RATING /////////
router.put('/rateUser', userController.rateUser);

////////////RATING END //////////


//router.post('/add', service.save);

// router.post('/rating/update', usermiddleware.exportparam, async (req, res) => {
//    let updatedUser = await service.patchrating(req.email, req.rating)
//    res.status(200).json(updatedUser)
// })

// router.delete('/rating/reset', usermiddleware.exportparam, async (req, res) => {
//    let updatedUser = await service.patchrating(req.email, 0)
//    res.status(200).json(updatedUser)
// })




router.get("/usersForAdmin",  userController.getUsersForAdmin);
router.get("/AllusersForAdmin",  userController.getAllUsersForAdmin);
router.get("/users", authorize(["client"]), userController.getUsers);
router.get('/userprofile',  userController.getUserProfile);
router.put('/updateusers', authorize(['admin', 'client']),

  body('email').trim().isEmail().withMessage('Invalid email.'),
  body('password').trim().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.'),
  userController.updateProfile);

  
  router.get('/ban',userController.banUser);

  router.get('/unban',userController.unbanUser);
 
  router.get('/disactivate',userController.disactivateUser);
 
  router.get('/activate',userController.activateUser);



module.exports = router