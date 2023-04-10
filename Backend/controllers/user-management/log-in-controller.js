const { getDb } = require("../../services/database/connection");
const emailController = require("../shared/email-controller");
const ObjectID = require("mongodb").ObjectId;
//const crypto = require("crypto");
const jtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.sendForgotPasswordLink = async (req, res) => {
  getDb()
    .collection("users")
    .findOneAndUpdate(
      { email: req.body.email, password: { $exists: true } },
      { $set: { password: "to_be_reinitialized" } }
    )
    .then((result) => {
      const user = result.value;
      if (user != null) {
        const token = jtoken.sign(
          {
            user_id: user._id.toString(),
          },
          process.env.TOKEN_SECRET,
          { expiresIn: "1h" }
        );

        emailController
          .sendEmailWithAction(
            req.body.email,
            "Forgot password",
            result.value.lastname + " " + result.value.firstname,
            "Reset password",
            `This is an email sent to reinitialize your password.<br>
                          <b>This email is only valid for 1 hour, if this email is not valid anymore you can always send a new request.</b><br>
                          Click the button bellow to reset your password.`,
            "http://localhost:3000/reset-password/" + token,
            "Reset password",
            "THE SHELF TEAM"
          )
          .then();

        // supposed to return true or false
        res.status(200).send(token);
      } else {
        res.status(200).send(false);
      }
    })
    .catch((error) => {
      res.status(500).send();
    });
};

exports.resetPasswordValidation = async (req, res) => {
  try {
    const verified = jtoken.verify(req.query.link, process.env.TOKEN_SECRET);
    const user = await getDb()
      .collection("users")
      .findOne({
        _id: new ObjectID(verified.user_id),
        password: "to_be_reinitialized",
      });

    if (user) {
      res.status(200).send(true);
    } else {
      res.status(200).send(false);
    }
  } catch (ex) {
    console.log(ex);
    res.status(500).json(ex);
  }
};

exports.resetPassword = async (req, res) => {
  const dbUsers = getDb().collection("users");
  const verified = jtoken.verify(req.body.token, process.env.TOKEN_SECRET);
  const salt = bcrypt.genSaltSync(10);
  req.body.new_password = bcrypt.hashSync(req.body.new_password, salt);

  dbUsers
    .updateOne(
      { _id: new ObjectID(verified.user_id) },
      { $set: { password: req.body.new_password } }
    )
    .then((result) => {
      res.status(200).send(true);
    })
    .catch((err) => {
      res.status(500).send();
    });
};

// exports.hashPwd = async (password) => {
//   return new Promise((resolve, reject) => {
//     crypto.scrypt(password, process.env.TOKEN_SECRET, 64, (err, derivedKey) => {
//       if (err) reject(err);
//       resolve(derivedKey.toString("hex"));
//     });
//   });
// };
