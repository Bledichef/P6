const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: email,
        password: hash,
      });
      user
        .save()
        .then(() =>
          res
            .status(status.CREATED)
            .json({ message: "Utilisateur créé et sauvegardé" })
        )

        .catch((error) => res.status(status.BAD_REQUEST).json({ error }));
    })

    .catch((error) => res.status(status.INTERNAL_SERVER_ERROR).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res
          .status(status.UNAUTHORIZED)
          .json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: "TOKEN",
          });
        })
        .catch((error) =>
          res.status(status.INTERNAL_SERVER_ERROR).json({ error })
        );
    })
    .catch((error) => res.status(status.INTERNAL_SERVER_ERROR).json({ error }));
};
