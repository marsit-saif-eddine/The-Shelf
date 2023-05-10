const { getDb } = require("../../services/database/connection");
const ObjectID = require("mongodb").ObjectId;

// DATA FIELDS:
// sender: shortUserData
// receiver: ShortUserData 
// message: string
exports.addMessage = (data) => {
  data.participants = data.sender._id > data.receiver._id ? [data.sender._id, data.receiver._id] : [data.receiver._id, data.sender._id];
  const dbPrivateChat = getDb().collection("private_chat");
  data.creation_date = new Date();
  return dbPrivateChat.insertOne(data);
};

exports.getPrivateConversation = async (req, res) => {
  try {
    const dbPrivateChat = getDb().collection("private_chat");
    const pipeline = [
      {
        $match: {
          $or: [
            {
              $and: [
                {
                  "sender._id": req.user._id,
                },
                {
                  "receiver._id": req.query.user_id,
                },
              ],
            },
            {
              $and: [
                {
                  "receiver._id": req.user._id,
                },
                {
                  "sender._id": req.query.user_id,
                },
              ],
            },
          ],
        },
      },
      {
        $project: {
          receiver: 0,
        },
      },
    ];

    const conversation = await dbPrivateChat.aggregate(pipeline).toArray();

    return res.status(200).send(conversation);
  } catch (ex) {
    return res.status(500).send();
  }
};

exports.getLatestMessages = async (req, res) => {
  try {
    const dbPrivateChat = getDb().collection("private_chat");
    const dbUsers = getDb().collection("users");

    const latestMessagesPipeline = [
      {
        $match: {
          $or: [
            {
              "sender._id": req.user._id,
            },
            {
              "receiver._id": req.user._id,
            },
          ],
        },
      },
      {
        $group: {
          _id: "$participants",
          messages: {
            $push: "$$ROOT",
          },
        },
      },
      {
        $project: {
          message: {
            $last: "$messages",
          },
          _id: 0,
        },
      },
      {
        $project: {
          message: '$message.message',
          sender: '$message.sender',
          receiver: '$message.receiver',
          creation_date: '$message.creation_date'
        }
      },
      {
        $sort: {
          "creation_date": -1
        }
      }
    ];

    let recentChats = await dbPrivateChat
      .aggregate(latestMessagesPipeline)
      .toArray();

      recentChats = recentChats.map(x => {
        if (x.sender._id == req.user._id) {
          return {
            message: x.message,
            user: x.receiver,
            creation_date: x.creation_date.toLocaleString("en-US")
          }
        } else {
          return {
            message: x.message,
            user: x.sender,
            creation_date: x.creation_date.toLocaleString("en-US")
          }
        }
      });


    const ids = recentChats.map((x) => new ObjectID(x.user._id));

    const contactsPipeline = [
      {
        $match: {
          $and: [
            {
              $nor: [
                {
                  _id: {$in: ids},
                },
              ],
            },
            {
              status: "active",
            },
            {
              isConfirmed: true,
            },
          ],
        },
      },
      {
        $project: {
          lastname: 1,
          firstname: 1,
          photo: 1,
        },
      },
    ];

    const contacts = await dbUsers.aggregate(contactsPipeline).toArray();

    return res.status(200).send({ contacts, recentChats });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send();
  }
};
