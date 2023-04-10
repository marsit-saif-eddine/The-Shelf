const User = require("../../models/user.js");



exports.getChatAndContacts = async (req, res) => {
    try {
        const users = await User.find({});
        let contacts = [];
        users.map(user => {
            const contact = {
                id: user._id,
                avatar: user.profile_photo,
                role:user.role,
                about:"",
                fullName: `${user.firstname} ${user.lastname}`,
                status: user.status
              }
            
            contacts.push(contact);
        });

        
        res.status(200).send(200, { chatsContacts:[], contacts, profileUser: {} });
        
    } catch (err) {
        res.status(400).json({ "message": err.message })
    }
  };