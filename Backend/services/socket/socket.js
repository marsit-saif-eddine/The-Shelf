const { getDb } = require("../../services/database/connection");
const ObjectID = require("mongodb").ObjectId;

exports.onClubMessageSent = async (data) => {
    const dbClubsChat = getDb().collection('clubs_chat');
    const club_data = {...data};
    delete club_data.club_id;
    const result = await dbClubsChat.updateOne({club_id: data.club_id}, {
        $push: {
            messages: club_data
        }
    },
    {
        upsert: true
    });
}

exports.getUserClubs = async (data) => {
    const dbClubs = getDb().collection('clubs');

    let filter = {};
    if (data.role != 'admin') {
        filter = {
            $or: [
                {
                    $and: [
                        {"members._id": data._id},
                        {"members.pending": {$exists: false}}
                    ]
                },
                {
                    "admins._id": data._id
                },
                {
                    "created_by._id": data._id
                }
            ]
        }
    }
    const clubs = await dbClubs.find( filter, {projection: {_id: 1}}).toArray();
    return clubs.map(x => x._id.toString());
}
