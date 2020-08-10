const bodyParser = require('body-parser');
const db = require('../config/database');

exports.reactPost =(req, res, next) => {
        db.Like.create({
            messageId : req.body.messageId,
             userId : req.body.userId,
            likeType : req.body.likeType    
        })
        .then(like => res.status(201).json({ like }))
        .catch(error => console.log(error))
            //  res.status(500).json(error))
    }
