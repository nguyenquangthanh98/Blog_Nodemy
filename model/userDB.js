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
        default: 2 //1:admin , 2:user
    }

}, {
    collection: "user"
})

// database Post
var postSchema = new Schema({
    title: String,
    content: Array,
    // img:String,
    // idUser: [{
    //     type: ObjectId,
    //     ref: "user"
    // }]
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


userModel.find({})
    .populate('idPost')
    .populate('idComment')
    .then(function(data) {
        {
            // console.log(data);
        }
    })


// userModel.create({
//     username: 'Thanh',
//     local: {
//         email: 'nguyenthanh',
//         password: '123'
//     },
//     facebook: {
//         email: 'thanh@gmail',
//     },
//     idPost: '5e6f8e9e351c7121e820eda7',
//     idComment: ['5e6f8e0a3499a9341ced8b0c', '5e6f8e0a3499a9341ced8b0d'],
//     active: false,
//     block: false,
//     type: 1
// })



// postModel.create({
//     title: 'Cách trở thành master',
//     content: 'Chăm code',
//     idComment: ['5e6f8e0a3499a9341ced8b0d', '5e6f8e0a3499a9341ced8b0c']

// })


// commentModel.create({
//     content: "Bai học tạm"
// }, {
//     content: "ok"
// })

module.exports = {
    userModel,
    postModel,
    commentModel
}