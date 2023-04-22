const router = require('express').Router();
const clubsController = require('../controllers/clubs-management/clubs-controller');
const clubDetailsController = require('../controllers/clubs-management/club-details-controller');
const { requireAuth } = require('../middleware/auth');
const uploadController = require('../controllers/upload-controller');

//START CLUBS CRUD ENDPOINTS
router.get('/getClubs', requireAuth, clubsController.getClubs);
router.get('/getClubToEdit', requireAuth, clubsController.getClubToEdit);
router.put('/editClub', requireAuth, uploadController.uploadClubLogo, clubsController.editClub);
router.post('/addClub', requireAuth, uploadController.uploadClubLogo, clubsController.addClub);
router.delete('/deleteClub', requireAuth, clubsController.deleteClub);
router.get('/getAdminsToSelect', requireAuth, clubsController.getAdminsToSelect);
//END CLUBS CRUD ENDPOINTS

//START JOIN/ACCEPT/REJECT
router.post('/sendJoinClubRequest', requireAuth, clubsController.sendJoinClubRequest);
router.put('/acceptJoinRequest', requireAuth, clubsController.acceptJoinRequest);
router.put('/cancelJoinRequest', requireAuth, clubsController.cancelJoinRequest);
//END JOIN/ACCEPT/REJECT

//START CLUB DETAILS ENDPOINTS
router.get('/getClubEvents', requireAuth, clubDetailsController.getClubEvents);
router.get('/getClubAnnouncements', requireAuth, clubDetailsController.getClubAnnouncements);
router.get('/getClubDetails', clubDetailsController.getClubDetails);
router.get('/getClubMembers', requireAuth, clubDetailsController.getClubMembers);
router.post('/publishAnnouncement', requireAuth, clubDetailsController.publishAnnouncement);
router.delete('/deleteAnnouncement', requireAuth, clubDetailsController.deleteAnnouncement);
router.get('/getClubConversation', requireAuth, clubDetailsController.getClubConversation);


//END CLUB DETAILS ENDPOINTS

module.exports = router;