const bodyParser = require('body-parser');
const db = require('../config/database');
const jwt = require('jsonwebtoken');
const comment = require('../models/comment');
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
        userId : userId,
        content : req.body.content    
    })
    .then(comment => res.status(201).json({ comment }))
    .catch(error => res.status(500).json(error))
}
// getOne comment
exports.getOneComment =  (req, res, next)=>{
    const token =  req.headers.authorization.split(' ')[1]; // on recupére le token(2eme élément du headers)
    const decodedToken = jwt.verify(
              token,
              process.env.PASS_WORD
    );
    const userId = decodedToken.userId;
    
     db.Comment.findOne({
        where : {
            userId : userId,
            id : req.params.id
        }
    })
    .then(comment =>  res.status(201).json({ comment }))
    .catch(error =>  res.status(500).json(error))
}
// delete comment 
exports.deleteComment = async (req, res, next)=>{
    const token =  req.headers.authorization.split(' ')[1]; // on recupére le token(2eme élément du headers)
    const decodedToken = jwt.verify(
              token,
              process.env.PASS_WORD
    );
    const userId = decodedToken.userId;
    //console.log(req.body)
    db.Comment.destroy({ 
        where : {
            userId : userId,
            id : req.params.id,
         }
    })
    .then(comment => { 
            res.status(200).json({ message : 'deleted with succés ! '}) 
        })
    .catch(error =>  res.statu(500).json({ error }))
}

// get all comments
exports.getAllComments = (req, res, next) =>{
    db.Comment.findAll()
      .then(comments => res.status(200).json({comments}))
      .catch(err => res.status(401).json({err}))
  }
// update comment 
//modify message
exports.updateOneComment =  (req, res, next)=>{
    const token =  req.headers.authorization.split(' ')[1]; // on recupére le token(2eme élément du headers)
    const decodedToken = jwt.verify(
              token,
              process.env.PASS_WORD
    );
    const userId = decodedToken.userId;
    
     db.Comment.update({
        content : req.body.content},
        {where : {
            messageId : req.body.messageId,
            userId : userId,
            id : req.params.id
        }}
    )
    .then(comment =>  res.status(201).json({ message : 'updated with succés !' }))
    .catch(error =>  res.status(500).json(error))
}