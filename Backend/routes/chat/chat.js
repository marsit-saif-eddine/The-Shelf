const router = require('express').Router();
const chatController = require('../../controllers/chat-management/chat-controller');
const { requireAuth } = require('../../middleware/auth');


router.get('/getPrivateConversation', requireAuth, chatController.getPrivateConversation);
router.get('/getLatestMessages', requireAuth, chatController.getLatestMessages);

module.exports = router;