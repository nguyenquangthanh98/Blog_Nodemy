const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var db = require('../model/userDB');

router.post('/reset',async function (req, res) {
//  var token = req.cookies
//  var decoded = jwt.verify(token, 'shhhhh')
var id = req.body.id
var password = req.body.password
var newPassword = req.body.newpassword
// bcrypt.hash(password, saltRounds, function (err, hash) {

 try {
    var user = await db.userModel.findOne({ _id: id }); 
    
   if(user.local.password!==password){
        res.json('kho')
   }

 } catch (error) {
     res.status(error)
 }
// }

 
})
module.exports = router;