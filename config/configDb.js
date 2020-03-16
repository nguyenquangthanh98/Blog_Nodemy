var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project3_Blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


module.exports = mongoose;