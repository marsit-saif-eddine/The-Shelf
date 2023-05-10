const { getDb } = require("../../services/database/connection");
const emailController = require("../shared/email-controller");
const ObjectID = require("mongodb").ObjectId;
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  
  const dbUsers = getDb().collection("users");

  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(req.body.password, salt);

  ability = [
    {
      action: 'read',
      subject: 'ACL'
    },
    {
      action: 'read',
      subject: 'Auth'
    },
    {
      action: 'client',
      subject: 'client'
    }
  ];

 username = `${req.body.firstname} ${req.body.lastname}`;

  dbUsers
    .insertOne({ ...req.body,username,ability,status:'active', role:'client',isConfirmed: false })
    .then((result) => {
      emailController
        .sendEmailWithAction(
          req.body.email,
          "Email confirmation",
          req.body.lastname + " " + req.body.firstname,
          `Please confirm your email`,
          `This is an email to confirm your sign up to our platform. Click the button bellow to confirm.`,
          "http://localhost:3000/mail-confirmed/" + result.insertedId,
          "Confirm",
          `THE SHELF TEAM`
        )
        .then();

      res.status(200).send(true);
    })
    .catch((err) => {
        console.log(err);
      if (err) {
        if (err.code == 11000) {
          res.status(200).send(false);
        } else {
          res.status(500).send("failed to invite user");
        }
      }
    });
};

exports.adminSignUp = async (req, res) => {
  const dbUsers = getDb().collection("users");

  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(req.body.password, salt);
    const user_id = req.body._id;
    delete req.body._id;

  ability = [
    {
      action: 'read',
      subject: 'ACL'
    },
    {
      action: 'read',
      subject: 'Auth'
    },
    {
      action: 'admin',
      subject: 'admin'
    }
  ]

  dbUsers
    .updateOne(
      { _id: new ObjectID(user_id) },
      {
        $set: {
          ...req.body,
          ability,
          username : `${req.body.firstname} ${req.body.lastname}`,
          status:'active',
          role:'admin',
          isConfirmed: false,
        },
      }
    )
    .then((result) => {
      emailController
        .sendEmailWithAction(
          req.body.email,
          "Email confirmation",
          req.body.lastname + " " + req.body.firstname,
          `Please confirm your email`,
          `This is an email to confirm your sign up to our platform. Click the button bellow to confirm.`,
          "http://localhost:3000/mail-confirmed/" + user_id,
          "Confirm",
          `THE SHELF TEAM`
        )
        .then();

      res.status(200).send(true);
    })
    .catch((err) => {
        console.log(err);
        if (err.code == 11000) {
          res.status(200).send(false);
        } else {
          res.status(500).send("failed to invite user");
        }
    });
};

exports.confirmEmail = async (req, res) => {
  const dbUsers = getDb().collection("users");
  dbUsers
    .updateOne(
      { _id: new ObjectID(req.query.user_id), isConfirmed: false },
      {
        $set: {
          isConfirmed: true,
        },
      }
    )
    .then((result) => {
      res.status(200).send(result.modifiedCount > 0);
    });
};

exports.inviteAdmin = async (req, res) => {
  const dbUsers = getDb().collection("users");

  req.body.email = req.body.email.toLowerCase();
  req.body.creation_date = new Date();
  req.body.isAdmin = true;
  req.body.username = `${req.body.firstname} ${req.body.lastname}`
  dbUsers
    .insertOne(req.body)
    .then(async (result) => {
      try {
        const sender = await dbUsers.findOne(
          { _id: new ObjectID(req.user._id) },
          { projection: { firstname: 1, lastname: 1 } }
        );
        emailController.inviteUserEmail(
          req.body.email,
          req.body.firstname + " " + req.body.lastname,
          result.insertedId.toString(),
          sender.lastname + " " + sender.firstname
        );

        // get responsibles' eails to notify the
        let receivers = await getDb()
          .collection("users")
          .find(
            {
              user_type: "admin",
              _id: { $ne: new ObjectID(req.user.user_id) },
              password: { $exists: true },
            },
            { projection: { email: 1, _id: 0 } }
          )
          .toArray();
        receivers = receivers.map((x) => x.email);
        emailController.onUsersManagementEmail(
          receivers,
          "A new admin has been invited",
          `This is a notification to inform you that the user 
                     <b>` +
            sender.lastname +
            " " +
            sender.firstname +
            `</b> invited Mr/Mme.
                     <b>` +
            req.body.lastname +
            " " +
            req.body.firstname +
            `</b> to join the platform as an admin.`
        );
        res.status(200).send(true);
      } catch (ex) {
        console.log(ex);
        res.status(500).json(ex);
      }
    })
    .catch((err) => {
      if (err) {
        if (err.code == 11000) {
          res.status(200).send("user already exist");
        } else {
          res.status(500).send("failed to invite user");
        }
      }
    });
};

exports.getPreInscription = async (req, res) => {
  try {
    const preInscription = await getDb()
      .collection("users")
      .findOne({
        _id: new ObjectID(req.query.id),
        password: { $exists: false },
      });
    if (preInscription) {
      res.status(200).send(preInscription);
    } else {
      res.status(200).send(null);
    }
  } catch (ex) {
    res.status(200).send(null);
  }
};
