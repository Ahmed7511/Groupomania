const bodyParser = require('body-parser');
const db = require('../config/database');
const jwt = require('jsonwebtoken');
const { json } = require('sequelize');

exports.reactPost = async(req, res, next) => {
  const token =  req.headers.authorization.split(' ')[1]; // on recupére le token(2eme élément du headers)
    const decodedToken = jwt.verify(
              token,
              process.env.PASS_WORD
    );
    const userId = decodedToken.userId;
    const liked = await db.Like.findOne({
        where: {
          messageId : req.body.messageId,
          userId : userId,
        },
      });
    
      const disliked = await db.Like.findOne({
        where: {
          messageId : req.body.messageId,
          userId : userId,
        },
      });
      if (liked) {
        await liked.destroy();
      } else if (disliked) {
        disliked.like = 1;
        await disliked.save();
      } else {
        await db.Like.create({
            messageId : req.body.messageId,
             userId : userId,
            likeType : req.body.likeType   
        })
      await db.Like.findAndCountAll({
          where: {
             messageId: req.body.messageId, 
             likeType : req.body.likeType   
          }
       })
       .then(result => {
        res.status(201).json(result.count)
         console.log(result.rows)
       })
    .catch(error => res.status(500).json(error))
    
      }
  }
  
//   exports.getAllReact = (req, res, next)=>{
//     db.Like.findAndCountAll({
//        where: {
//           messageId: req.params.id, 
//           likeType
//        }
//     })
//     .then(result => {
//      res.status(201).json(result)
//       console.log(result.rows)
//     });
//  }


  exports.getAllLike = (req, res, next)=>{
     db.Like.findAndCountAll({
        where: {
           messageId: req.params.id, 
           likeType: 1
        }
     })
     .then(result => {
      res.status(201).json(result.count)
       console.log(result.rows)
     });
  }
   
  exports.getAllDisLike =  (req, res, next)=>{
    db.Like.findAndCountAll({
        where: {
           messageId: req.params.id, 
           likeType: -1
        }
     })
     .then(result => {
      res.status(201).json(result.count)
       console.log(result.rows)
     });
  }
