const router = require('express').Router();
const clubsController = require('../controllers/clubs-management/clubs-controller');
const clubDetailsController = require('../controllers/clubs-management/club-details-controller');

//START CLUBS CRUD ENDPOINTS
router.get('/getClubs', clubsController.getClubs);
router.get('/getClubToEdit', clubsController.getClubToEdit);
router.put('/editClub', clubsController.editClub);
router.post('/addClub', clubsController.addClub);
router.delete('/deleteClub', clubsController.deleteClub);
router.get('/getAdminsToSelect', clubsController.getAdminsToSelect);
//END CLUBS CRUD ENDPOINTS

//START JOIN/ACCEPT/REJECT
router.post('/sendJoinClubRequest', clubsController.sendJoinClubRequest);
router.put('/acceptJoinRequest', clubsController.acceptJoinRequest);
router.put('/cancelJoinRequest', clubsController.cancelJoinRequest);
//END JOIN/ACCEPT/REJECT

//START CLUB DETAILS ENDPOINTS
router.get('/getClubEvents', clubDetailsController.getClubEvents);
router.get('/getClubAnnouncements', clubDetailsController.getClubAnnouncements);
router.get('/getClubDetails', clubDetailsController.getClubDetails);
router.get('/getClubMembers', clubDetailsController.getClubMembers);
router.post('/publishAnnouncement', clubDetailsController.publishAnnouncement);
router.delete('/deleteAnnouncement', clubDetailsController.deleteAnnouncement);
router.get('/getClubConversation', clubDetailsController.getClubConversation);


//END CLUB DETAILS ENDPOINTS

module.exports = router;