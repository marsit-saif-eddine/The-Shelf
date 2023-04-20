const { getDb } = require("../../services/database/connection");
const ObjectID = require("mongodb").ObjectId;


exports.getClubDetails = async (req, res) => {
    try {
        const dbClubs = getDb().collection('clubs');
        const club = await dbClubs.findOne({_id: new ObjectID(req.query.club_id)});

        if (club) {
            return res.status(200).send(club);
        }
        return res.status(404).send();
    } catch(ex) {
        return res.status(500).send();
    }
}

exports.getClubMembers = async (req, res) => {
    try {
        const dbClubs = getDb().collection('clubs');
        const members = await dbClubs.find({club_id: req.query.club_id}).toArray();

        return res.status(200).send(members);
    } catch(ex ) {
        return res.status(500).send();
    }
}

exports.getClubEvents = async (req, res) => {
    try {
        const dbClubEvents = getDb().collection('club_events');
        const events = await dbClubEvents.find({club_id: req.query.club_id}).toArray();

        return res.status(200).send(events);

    } catch(ex) {
        return res.status(500).send();
    }
}

exports.getClubAnnouncements = async (req, res) => {
    try {
        const dbClubAnnouncements = getDb().collection('club_announcements');
        const clubAnnouncements = await dbClubAnnouncements.find({club_id: req.query.club_id}).toArray();

        return res.status(200).send(clubAnnouncements);
    } catch(ex) {
        return res.status(500).send();
    }
}

exports.publishAnnouncement = async (req, res) => {
    try {
        const dbClubAnnouncements = getDb().collection('club_announcements');

        req.body.publisher = {
            _id: '',//req.user._id,
            lastname: 'Abidi',//req.user.lastname,
            firstname: 'Wajih',//req.user.firstname,
            photo: 'https://graphicriver.img.customer.envatousercontent.com/files/395988839/preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=590&s=9133752d1e9837a45f7a15ed2d820778'//req.user.photo
        }

        req.body.creation_date = new Date();

        const result = await dbClubAnnouncements.insertOne(req.body);

        return res.status(200).send(true);
    } catch(ex) {
        console.log(ex);
        return res.status(500).send();
    }
}

exports.deleteAnnouncement = async (req, res) => {
    try {
        const dbClubAnnouncements = getDb().collection('club_announcements');

        const result = await dbClubAnnouncements.deleteOne({_id: new ObjectID(req.query._id)});
        if (result.deletedCount > 0) {
            return res.status(200).send(true);
        }
        return res.status(404).send();
    } catch(ex) {
        return res.status(500).send();
    }
}

exports.getClubConversation = async (req, res) => {
    try {
        const dbClubsChat = getDb().collection('clubs_chat');
        conversation = await dbClubsChat.findOne({club_id: req.query.club_id});
        return res.status(200).send(conversation);
    } catch(ex) {
        return res.status(500).send();
    }
}