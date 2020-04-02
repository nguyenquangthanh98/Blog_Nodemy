var express = require('express');
var router = express.Router();
var db = require('../model/userDB');
var path = require("path");
var QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;

router.get('/single', function (req, res, next) {
    res.render("single")
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

    // TypeScript / ES6:
    // import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'; 

    try {
        var deltaOps = JSON.parse(req.body.content)
        var cfg = {};
        var converter = new QuillDeltaToHtmlConverter(deltaOps, cfg);
        var html = converter.convert();
        console.log(req.body.title);
        let postNew = await db.postModel.create({
            content: html,
            title: req.body.title
            // img: req.body.img,
            // idUser: req.token.idUser
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