var express = require('express');
var router = express.Router();
var db = require('../model/userDB');

router.get('/post', async function (req, res, next) {
    try {
        var Show = await db.postModel.find();
        res.json({
            error: false,
            data: Show
        });
    } catch (error) {
        res.json({
            error: true,
            data: error
        });
    }

});

router.get('/post/:idpost', async function (req, res, next) {
    var id = req.params.idpost
    try {
        var ShowId = await db.postModel.findById(id);

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

router.post('/post', async (req, res) => {

    try {
        let commentNew = await db.postModel.create({
            content: req.body.content,
            title: req.body.title,
            img: req.body.img,
            idUser: req.body.idUser
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

router.delete('/post/:id', async (req, res) => {

    try {
        let commentNew = await db.postModel.findByIdAndDelete({
            _id: req.params.id
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