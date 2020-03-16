var express = require('express');
var router = express.Router();
var userModel = require('../model/userDB');

router.get('/checkUserModel', (req, res, next) => {
    userModel.find()
        .populate('idPost')
        .populate('idComment')
        .then((data) => {
            res.json(data)
        })
})


module.exports = router;