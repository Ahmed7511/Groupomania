const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // pour créé les token et les vérifie
const db = require("../config/database");
const dotenv = require("dotenv").config(); // pour caché les donnés
const path = require("path");
//get AllUsers
exports.getAllUsers = (req, res, next) => {
   db.User.findAll()
      .then((users) => res.status(200).json({ users }))
      .catch((err) => res.status(401).json({ err }));
};
exports.getOneUser = (req, res, next) => {
   const token = req.headers.authorization.split(" ")[1];
   const decodedToken = jwt.verify(token, process.env.PASS_WORD);
   const userId = decodedToken.userId;
   db.User.findOne({
      where: {
         id: userId,
      },
   })
      .then((user) => res.status(200).json({ user }))
      .catch((err) => res.status(401).json({ err }));
};
//CREATE user
exports.signup = (req, res, next) => {
   let { pseudo, email, password } = req.body;
   db.User.findOne({
      where: {
         // pour ne pas repéter l'email et le pseudo
         pseudo: req.body.pseudo,
         email: req.body.email,
      },
   })

      .then((user) => {
         if (user) {
            return res.status(404).json({ error: "Utilisateur existe déja!" });
         } else {
            bcrypt
               .hash(req.body.password, 10)
               .then((hash) => {
                  db.User.create({
                     pseudo: req.body.pseudo,
                     email: req.body.email,
                     password: hash,
                  })
                     .then((user) =>
                        res.status(201).json({
                           userId: user.id,
                           userPseudo: user.pseudo,
                           token: jwt.sign(
                              { userId: user.id },
                              process.env.PASS_WORD,
                              { expiresIn: "24h" }
                           ),
                        })
                     )
                     .catch((error) => res.status(400).json({ error }));
               })
               .catch((error) => res.status(500).json({ error }));
         }
      })
      .catch((error) => res.status(500).json({ error }));
};

//login
exports.login = (req, res, next) => {
   db.User.findOne({
      where: {
         email: req.body.email,
      },
   })

      .then((user) => {
         if (!user) {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
         }
         bcrypt
            .compare(req.body.password, user.password)
            .then((valid) => {
               if (!valid) {
                  return res
                     .status(401)
                     .json({ error: "Mot de passe incorrect !" });
               }
               res.status(200).json({
                  userId: user.id,
                  userPseudo: user.pseudo,
                  token: jwt.sign({ userId: user.id }, process.env.PASS_WORD, {
                     expiresIn: "24h",
                  }),
               });
            })
            .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
};

//delete user
exports.deleteOneUser = (req, res, next) => {
   db.User.destroy({
      where: { id: req.params.id },
   })
      .then(() => res.status(200).json({ message: "Objet supprimé !" }))
      .catch((err) => res.status(400).json({ err }));
};

//update user
exports.updateOneUser = (req, res, next) => {
   db.User.update(
      {
         pseudo: req.body.pseudo,
         email: req.body.email,
      },
      {
         where: {
            id: req.params.id,
         },
      }
   )
      .then((user) =>
         res.status(201).json({ message: "updated with succés !" })
      )
      .catch((error) => res.status(500).json(error));
};
