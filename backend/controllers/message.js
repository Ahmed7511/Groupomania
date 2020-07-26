const bodyParser = require('body-parser');
const db = require('../config/database');
const jwt = require('jsonwebtoken');
const message = require('../models/message')


exports.getAllMessage =  (req,res, next) =>{
        db.Message.findAll({
            include: [{
                model: db.User,
                attributes: ['id', 'pseudo']
            }]
        })
        .then(messages =>  
            {
            const Messages = [];
            messages.forEach(message => 
                Messages.push({
                    "id": message.id ,
                    "title": message.title,
                    "content": message.content,
                   //  "likes": post.likes,
                    "pseudo" : message.User.pseudo ,
                    "userId": message.userId,
                    "createdAt": message.createdAt
                })
            )
        
            return res.status(200).json({Messages})
        })

        .catch(error =>  res.status(500).json(error))
    }
 // crée un message
exports.createMessage = async (req, res, next)=>{
    const token =  req.headers.authorization.split(' ')[1]; // on recupére le token(2eme élément du headers)
    const decodedToken = jwt.verify(
              token,
              process.env.PASS_WORD
    );
    const userId = decodedToken.userId;
    const MessageObjet = JSON.parse(req.body) 
    db.Message.create({title : req.body.title , content : req.body.content , UserId : userId})
    .then(message =>  res.status(201).json({ message : 'message ajouté avec succés ! '}))
    .catch(error =>  res.status(500).json(error))
}
 // supprimé un message     
 exports.deleteMessage = async (req, res, next)=>{
    const token =  req.headers.authorization.split(' ')[1]; // on recupére le token(2eme élément du headers)
    const decodedToken = jwt.verify(
              token,
              process.env.PASS_WORD
    );
    const userId = decodedToken.userId;
    console.log(req.body)
    db.Message.destroy({
        where : {
            userId : userId,
            message_id : req.params.id
        }
    })
    
    .then(message => { 
         if(req.body.userId === userId){
            res.status(200).json({ message : 'message supprimé avec succés ! '})
         }else if(req.body.userId !== userId){
            res.status(404).json({message : 'action non requis ! '})
         } 
        })
    .catch(error =>  res.status(500).json(error))
}
// get one message
exports.getOneMessage =  (req, res, next)=>{
    const token =  req.headers.authorization.split(' ')[1]; // on recupére le token(2eme élément du headers)
    const decodedToken = jwt.verify(
              token,
              process.env.PASS_WORD
    );
    const userId = decodedToken.userId;
    
     db.Message.findOne({
        where : {
            userId : userId,
            message_id : req.params.id
        }
    })
    .then(message =>  res.status(201).json({ message }))
    .catch(error =>  res.status(500).json(error))
}

//modify message
exports.updateOneMessage =  (req, res, next)=>{
    const token =  req.headers.authorization.split(' ')[1]; // on recupére le token(2eme élément du headers)
    const decodedToken = jwt.verify(
              token,
              process.env.PASS_WORD
    );
    const userId = decodedToken.userId;
    
     db.Message.update(
        {title : req.body.title,
          content : req.body.content},
        {returning: true},
        {where : {
            userId : userId,
            message_id : req.params.id
        }}
    )
    .then(message =>  res.status(201).json({ message }))
    .catch(error =>  res.status(500).json(error))
}