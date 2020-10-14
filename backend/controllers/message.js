const bodyParser = require("body-parser");
const db = require("../config/database");
const jwt = require("jsonwebtoken");
const message = require("../models/message");
const fs = require("fs");
const jwtUtils = require('jwt-utils');
var asyncWaterfall = require('async-waterfall');

exports.getAllMessage = (req, res, next) => {
   db.Message.findAll({
      include: [
         {
            model: db.User,
            attributes: ["id", "pseudo"],
         },
      ],
      order: [["id", "DESC"]],
   })
      .then((messages) => {
         const Messages = [];
         messages.forEach((message) =>
            Messages.push({
               id: message.id,
               title: message.title,
               content: message.content,
               imageUrl: message.imageUrl,
               likes: message.likes,
               DisLikes: message.DisLikes,
               pseudo: message.User.pseudo,
               userId: message.userId,
               createdAt: message.createdAt,
            })
         );

         return res.status(200).json({ Messages });
      })

      .catch((error) => res.status(500).json(error));
};
// crée un message
exports.createMessage = async (req, res, next) => {
   const token = req.headers.authorization.split(" ")[1]; // on recupére le token(2eme élément du headers)
   const decodedToken = jwt.verify(token, process.env.PASS_WORD);
   const userId = decodedToken.userId;
   if (!req.file) {
      db.Message.create({
         ...req.body,
         UserId: userId,
         imageUrl: "",
      })
         .then((
            message //console.log(message)
         ) => res.status(201).json({ message }))

         .catch((
            error //console.log(error))
         ) => res.status(500).json(error));
   } else if (req.file) {
      db.Message.create({
         ...req.body,
         UserId: userId,
         imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
         }`,
      })
         .then((
            message //console.log(message)
         ) => res.status(201).json({ message }))

         .catch((
            error //console.log(error))
         ) => res.status(500).json(error));
   }
};

// supprimé un message
exports.deleteMessage = async (req, res, next) => {
   db.Message.findOne({
      where: {
         message_id: req.params.id,
      },
   })
      .then((message) => {
         const filename = message.imageUrl.split("/images/")[1];

         fs.unlink(`images/${filename}`, () => {
            db.Message.destroy({ where: { message_id: req.params.id } })
               .then(() =>
                  res.status(200).json({ message: "Objet supprimé !" })
               )
               .catch((error) => res.status(400).json({ error }));
         });
      })
      .catch((error) => res.status(500).json(error));
};

// get one message
exports.getOneMessage = (req, res, next) => {
   const token = req.headers.authorization.split(" ")[1]; // on recupére le token(2eme élément du headers)
   const decodedToken = jwt.verify(token, process.env.PASS_WORD);
   const userId = decodedToken.userId;

   db.Message.findOne({
      where: {
         userId: userId,
         message_id: req.params.id,
      },
   })
      .then((message) => res.status(201).json({ message }))
      .catch((error) => res.status(500).json(error));
};

//modify message
exports.updateOneMessage = (req, res, next) => {
   const token = req.headers.authorization.split(" ")[1]; // on recupére le token(2eme élément du headers)
   const decodedToken = jwt.verify(token, process.env.PASS_WORD);
   const userId = decodedToken.userId;

   db.Message.update(
      { title: req.body.title, content: req.body.content } || {
         ...req.body,
         imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
         }`,
      },
      {
         where: {
            userId: userId,
            message_id: req.params.id,
         },
      }
   )
      .then((message) => res.status(201).json({ message }))
      .catch((error) => res.status(500).json(error));
};


exports.likeMessage = async(req, res, next) => {
   const token = req.headers.authorization.split(" ")[1]; // on recupére le token(2eme élément du headers)
   const decodedToken = jwt.verify(token, process.env.PASS_WORD);
   const userId = decodedToken.userId;
   const liked = await db.Like.findOne({
      where: {
           messageId: req.params.id,
           userId: userId,
      },
 });

 const disliked = await db.Like.findOne({
      where: {
           messageId: req.params.id,
           userId: userId,
      },
 });
// console.log(liked)
 if (liked) {
      await liked.destroy();
 } else if (disliked) {
      disliked.like = 1;
      await disliked.save();
 } else {
      await db.Like.create({
           messageId: req.params.id,
           userId: userId,
           likeType: req.body.likeType,
      });
      
      if(req.body.likeType ==1){ db.Like.findAndCountAll({
           where: {
                messageId: req.params.id,
                likeType: 1,
           },
          
      })
           .then(result=> //console.log(result))
                     //   {  res.status(201).json({
                     //       reacts: result.rows,
                     //        likes: result.count})
                     //                       })
                     {
                        db.Message.update({
                        likes : result.count},
                        {
                           where: {
                              message_id: req.params.id,
                           },
                        }
                     )
                        .then((message) => res.status(201).json({ message }))
                        .catch((error) => res.status(500).json(error));
                     })
           .catch(error => //console.log(error))
           res.status(500).json(error)); 
}else if(req.body.likeType == -1) {
   db.Like.findAndCountAll({
      where: {
           messageId: req.params.id,
           likeType: -1,
      },
     
 })
      .then(result=> //console.log(result))
                //   {  res.status(201).json({
                //       reacts: result.rows,
                //        likes: result.count})
                //                       })
                {
                   db.Message.update({
                   DisLikes : result.count},
                   {
                      where: {
                         message_id: req.params.id,
                      },
                   }
                )
                   .then((message) => res.status(201).json({ message }))
                   .catch((error) => res.status(500).json(error));
                })
      .catch(error => //console.log(error))
      res.status(500).json(error)); 
               }
 }

}
   // asyncWaterfall([
     
//       function(messageFound, userFound, done) {
//          if(userFound) {
//            models.Like.findOne({
//              where: {
//                userId: userId,
//                messageId: messageId
//              }
//            })
//            .then(function(userAlreadyLikedFound) {
//              done(null, messageFound, userFound, userAlreadyLikedFound);
//            })
//            .catch(function(err) {
//              return res.status(500).json({ 'error': 'unable to verify is user already liked' });
//            });
//          } else {
//            res.status(404).json({ 'error': 'user not exist' });
//          }
//        },
//        function(messageFound, userFound, userAlreadyLikedFound, done) {
//          if(!userAlreadyLikedFound) {
//            messageFound.addUser(userFound, { isLike: LIKED })
//            .then(function (alreadyLikeFound) {
//              done(null, messageFound, userFound);
//            })
//            .catch(function(err) {
//              return res.status(500).json({ 'error': 'unable to set user reaction' });
//            });
//          } else {
//            if (userAlreadyLikedFound.isLike === DISLIKED) {
//              userAlreadyLikedFound.update({
//                isLike: LIKED,
//              }).then(function() {
//                done(null, messageFound, userFound);
//              }).catch(function(err) {
//                res.status(500).json({ 'error': 'cannot update user reaction' });
//              });
//            } else {
//              res.status(409).json({ 'error': 'message already liked' });
//            }
//          }
//        },
//        function(messageFound, userFound, done) {
//          messageFound.update({
//            likes: messageFound.likes + 1,
//          }).then(function() {
//            done(messageFound);
//          }).catch(function(err) {
//            res.status(500).json({ 'error': 'cannot update message like counter' });
//          });
//        },
//      ], function(messageFound) {
//        if (messageFound) {
//          return res.status(201).json(messageFound);
//        } else {
//          return res.status(500).json({ 'error': 'cannot update message' });
//        }
     
//    })
// }