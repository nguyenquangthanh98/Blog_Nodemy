var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/passport",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.once('open', function() {
    console.log(`Connect to Database Successfully!`)
});
module.exports = mongoose;