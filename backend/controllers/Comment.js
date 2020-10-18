const bodyParser = require('body-parser');
const db = require('../config/database');
const jwt = require('jsonwebtoken');
const comment = require('../models/comment');
const fs = require('fs');
// get all comments
exports.getAllComments = (req, res, next) =>{
    db.Comment.findAll({
        include: [{
        model: db.User,
        attributes: ['id', 'pseudo']
    }]
    })
    .then(items => 
        {
        const Comments = [];
        items.forEach(item => 
            Comments.push({
                "id": item.id ,
                "comment": item.comment,
                "messageId": item.messageId,
                "pseudo" : item.User.pseudo ,
                "userId": item.userId,
                "createdAt": item.createdAt
            })
        )      
        return res.status(200).json({Comments})
        })

    .catch(error =>  res.status(500).json(error))
    }
// post comment
exports.createComment = (req, res, next)=>{
const token =  req.headers.authorization.split(' ')[1]; // on recupére le token(2eme élément du headers)
const decodedToken = jwt.verify(
          token,
          process.env.PASS_WORD
);
const userId = decodedToken.userId;
    db.Comment.create({
        messageId : req.body.messageId,
         UserId : userId,
        comment : req.body.comment    
    })
    .then(comment =>// console.log(comment))
        res.status(201).json({ comment }))
    .catch(error => console.log(error))
        //  res.status(500).json(error))
}
// getOne comment
exports.getOneComment =  (req, res, next)=>{
   
     db.Comment.findOne({
        where : {
            id : req.params.id,
        }
    })
    .then(comment =>  res.status(201).json({ comment }))
    .catch(error =>  res.status(500).json(error))
}
// delete comment 
exports.deleteComment = async (req, res, next)=>{
   
    db.Comment.destroy({ 
        where : {
            id : req.params.id,
         }
    })
    .then(comment => { 
            res.status(200).json({ message : 'deleted with succés ! '}) 
        })
    .catch(error => //console.log(error))
         res.statu(500).json({ error }))
}


// update comment 
exports.updateOneComment =  (req, res, next)=>{    
     db.Comment.update({
        comment : req.body.comment},
        {where : {
            messageId : req.body.messageId,
            id : req.params.id
        }}
    )
    .then(comment =>  res.status(201).json({ message : 'updated with succés !' }))
    .catch(error =>  res.status(500).json(error))
}