const {getDb} = require('../../services/database/connection');
const {ObjectID} = require('mongodb');


exports.getMyClubs = async (req, res) => {
    try {
        const dbClubs = getDb().collection('clubs');
        const clubs = await dbClubs.find({_id: new ObjectID(req.query.user_id)}).toArray();

        return res.status(200).send(clubs);
    } catch(ex) {
        return res.status(500).send();
    }
}

exports.getClubsSuggestions = async (req, res) => {
    try {
        const dbClubs = getDb().collection('clubs');
        const clubs = await dbClubs.find({}).limit(10).toArray();

        return res.status(200).send(clubs);
    } catch(ex) {
        return res.status(500).send();
    }
}

exports.getMyRecentEvents = async (req, res) => {
    try {
    } catch(ex) {
        
    }
}

