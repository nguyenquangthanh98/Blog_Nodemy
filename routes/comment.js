var express = require('express');
var router = express.Router();
var db = require('../model/userDB');
var jwt = require('jsonwebtoken');

/* GET users listing. */

router.get('/comment/:idpost', async function (req, res, next) {
    var id = req.params.idpost
    try {
        var ShowId = await db.commentModel.find({post:id}).populate('user');

        res.json({
            error: false,
            data: ShowId
        });

    } catch (error) {
        res.json({
            error: true,
            data: error
        })
    }

});


router.post('/comment/:idpost', async (req, res) => {
    var idPost = req.params.idpost
    var token = req.cookies.token
    var comment = req.body.comment
    var jwtDecoded = jwt.verify(token, 'caothaito');

    // res.json(jwtDecoded.id);
    // console.log(idPost);

    try {
        let commentNew = await db.commentModel.create({
            content: comment,
            user: jwtDecoded.id,
            post: idPost
        })
        res.json({
            error: false,
            data: commentNew
        });
    } catch (error) {
        res.json({
            error: true,
            data: error
        })
    }
});

module.exports = router;