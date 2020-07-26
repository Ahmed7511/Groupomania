const fs = require('fs');
const db = require('../config/database');
 
const Image = require('../models/Image')
  
// force: true will drop the table if it already exists
exports.createImage = (req, res, next)=>{ db.sequelize.sync({force: true}).then(() => {
    //Give any image name here.
  var imageData = fs.readFileSync(__dirname + '/backend/images/');
  Image.create({
    type: req.body.type,
    name: req.body.name,
    data: imageData
  }).then(image => {
    try{
      fs.writeFileSync(__dirname + '/backend/images/', image.data);    
      // exit node.js app
      process.exit(0);
    }catch(e){
      console.log(e);
    }
  })
});
}