var express = require('express');

var router = express.Router();
const chatController = require('../../controllers/chat/chat');


router.get('/getChatContacts', chatController.getChatAndContacts)
module.exports = router;