const { getDb } = require("../../services/database/connection");
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
                    {"members._id": data},
                    {"members.pending": {$exists: false}}
                ]
            },
            {
                "admins._id": data
            },
            {
                "created_by._id": data
            }
        ]
    }, {projection: {_id: 1}}).toArray();
    return clubs.map(x => x._id.toString());
}
