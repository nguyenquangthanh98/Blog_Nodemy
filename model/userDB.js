var mongoose = require('../config/configDb');
var Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// database User
var userSchema = Schema({
    
    local: {
        email: String,
        password: String
    },
    facebook: {
        email: String,
    },
    idPost: {
        type: String,
        default: null,
        ref: 'post'
    },
    idComment: [{
        type: ObjectId,
        default: null,
        ref: 'comment'
    }],
    activeMail: {
        type: Boolean,
        default: false
    },
    block: {
        type: Boolean,
        default: false
    },
    type: {
        type: Number,
        default: 1 //1:admin , 2:user
    }
}, {
    collection: "user"
})

// database Post
var postSchema = new Schema({
    title: String,
    content: Array,
    idUser: [{
        type: ObjectId,
        ref: "user"
    }]
}, {
    collection: "post"
})

//db Comment
var commentSchema = new Schema({
    content: String,
    user: [{
        type: ObjectId,
        ref: "user"
    }],
    post: [{
        type: ObjectId,
        ref: "post"
    }]
}, {
    collection: "comment"
})

var userModel = mongoose.model('user', userSchema);
var postModel = mongoose.model('post', postSchema);
var commentModel = mongoose.model('comment', commentSchema);
module.exports = {
    userModel,
    postModel,
    commentModel
   }