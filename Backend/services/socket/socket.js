const { getDb } = require("../database/connection");
const ObjectID = require("mongodb").ObjectId;


exports.onClubMessageSent = async (data) => {
    const dbClubsChat = getDb().collection('clubs_chat');
    const club_id = data.club_id;
    delete data.club_id;
    const result = await dbClubsChat.updateOne({club_id}, {
        $push: {
            messages: data
        }
    },
    {
        upsert: true
    });
}

exports.getUsersClubs = async (data) => {
    const dbClubs = getDb().collection('clubs');
    const clubs = await dbClubs.find( {
        $or: [
            {
                $and: [
                    {"members._id": data.user_id},
                    {"members.pending": {$exists: false}}
                ]
            },
            {
                "admins._id": data.user_id
            }
        ]
    }, {projection: {_id: 1}}).toArray();

    return clubs;
}
