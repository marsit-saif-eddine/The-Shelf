const router = require('express').Router();
const signUpController = require('../../controllers/user-management/sign-up-controller');
const loginController = require('../../controllers/user-management/log-in-controller');
const {upload} = require('../../controllers/upload-controller');

router.post('/signUp', (req, res, next) => {console.log({...req.body}); next()}, upload.single('img'), signUpController.signUp);
router.get('/confirmEmail', signUpController.confirmEmail);
router.put('/sendForgotPasswordLink', loginController.sendForgotPasswordLink);
router.get('/resetPasswordValidation', loginController.resetPasswordValidation);
router.put('/resetPassword', loginController.resetPassword);
router.post('/inviteAdmin', signUpController.inviteAdmin);
router.post('/adminSignUp', upload.single('img'), signUpController.adminSignUp);
router.get('/getPreInscription', signUpController.getPreInscription);
module.exports = router;