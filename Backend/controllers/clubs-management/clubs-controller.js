const { getDb } = require("../../services/database/connection");
const ObjectID = require("mongodb").ObjectId;

exports.addClub = async (req, res) => {
  try {
    const dbClubs = getDb().collection("clubs");

    req.body.created_by = {
      _id: req.user._id,
      lastname: req.user.lastname,
      firstname: req.user.firstname,
      photo: req.user.photo
    };

    req.body.creation_date = new Date();

    const result = await dbClubs.insertOne(req.body);
    return res.status(200).send(result.insertedId);
  } catch (ex) {
    if (ex.code == 11000) {
      return res.status(200).send(false);
    }
    return res.status(500).send();
  }
};

exports.editClub = async (req, res) => {
  try {
    const dbClubs = getDb().collection("clubs");
    const _id = new ObjectID(req.query._id);
    const update = await dbClubs.updateOne(
      { _id },
      {
        $set: req.body,
      }
    );
    if (update.matchedCount > 0) {
      return res.status(200).send();
    } else {
      return res.status(404).send();
    }
  } catch (ex) {
    return res.status(500).send();
  }
};

exports.getClubToEdit = async (req, res) => {
  try {
    const dbClubs = getDb().collection("clubs");
    const _id = new ObjectID(req.query.club_id);
    const club = await dbClubs.findOne({ _id });
    return res.status(200).send(club);
  } catch (ex) {
    return res.status(500).send();
  }
};

exports.deleteClub = async (req, res) => {
  try {
    const dbClubs = getDb().collection("clubs");
    const result = await dbClubs.deleteOne({
      _id: new ObjectID(req.query.club_id),
    });
    if (result.deletedCount > 0) {
      return res.status(200).send(true);
    } else {
      return res.status(404).send();
    }
  } catch (ex) {
    return res.status(500).send();
  }
};

exports.getClubs = async (req, res) => {
  try {
    const dbClubs = getDb().collection("clubs");
    const clubs = await dbClubs.find().toArray();

    return res.status(200).send(clubs);
  } catch (ex) {
    console.log(ex)
    return res.status(500).send();
  }
};

exports.getAdminsToSelect = async (req, res) => {
  try {
    const dbUsers = getDb().collection("users");
    const users = await dbUsers
      .find(
        {},
        {
          projection: {
            lastname: 1,
            firstname: 1,
            photo: 1
          },
        }
      )
      .toArray();
    return res.status(200).send(users);
  } catch (ex) {
    return res.status(500).send();
  }
};

exports.sendJoinClubRequest = async (req, res) => {
  try {
    const dbClubs = getDb().collection("clubs");
    const result = await dbClubs.updateOne(
      { _id: new ObjectID(req.query.club_id) },
      {
        $push: {
          members: {...req.user, pending: true},
        },
      }
    );

    return res.status(200).send(true);
  } catch (ex) {
    return res.status(500).send();
  }
};

exports.acceptJoinRequest = async (req, res) => {
  try {
    const dbClubs = getDb().collection("clubs");
    const result = await dbClubs.updateOne(
      { _id: new ObjectID(req.query.club_id) },
      { $unset: { "members.$[member].pending": 1 } },
      { arrayFilters: [{ 'member._id': req.body.user_id }] }
    );
    console.log(result);

    return res.status(200).send(true);
  } catch (ex) {
    return res.status(500).send();
  }
};

exports.cancelJoinRequest = async (req, res) => {
  try {
    const dbClubs = getDb().collection("clubs");
    const result = await dbClubs.updateOne(
      { _id: new ObjectID(req.query.club_id) },
      { $pull: {members: {_id: req.body.user_id} } }
    );

    return res.status(200).send(true);
  } catch (ex) {
    console.log(ex);
    return res.status(500).send();
  }
};
