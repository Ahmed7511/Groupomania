const bodyParser = require('body-parser');
const db = require('../config/database');
const message = require('../models/message');
exports.getAllMessage = (req,res, next) =>{
    db.Message.findAll({
        include: [{
            model: models.User,
            attributes: ['id', 'pseudo']
        }]
        .then(message => messages.forEach((message) => {
            console.log(message.id);
            message.users.forEach((user) => {
                console.log(user.id);
            });
        })
        )
    })
}
exports.getMessage = (req, res, next)=>{
 let {title, content} = req.body;   
    db.Message.create({
        title : req.body.title,
        content: req.body.content,
        userId : localStorage.getItem('token').
                  JWT.decode(token , process.env.PASS_WORD , function(err, decodedToken) {
              if(err) {res.send(err) }
              else {
               req.userId = decodedToken.id;   // Add to req object
               next();
              }
            })
         
    })
    .then(message => res.status(201).json({ message : 'message ajouté avec succés ! '}))
    .catch(error => res.status(400).json({ error }));

}