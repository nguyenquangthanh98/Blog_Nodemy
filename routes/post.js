var express = require('express');
var router = express.Router();
var db = require('../model/userDB');
var path = require("path");

router.get('/get-post', function (req, res, next) {
    res.render("getPost")
});

router.get('/post', function (req, res, next) {
    res.sendFile(path.join(__dirname, "../views/post.html"))
});


router.get('/get-all-post', async function (req, res, next) {
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
    console.log(req.body);
    try {
        let postNew = await db.postModel.create({
            content: req.body.content
        })
        res.json({
            error: false,
            data: "them thanh cong"
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