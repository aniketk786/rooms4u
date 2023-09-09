const mongoose = require("mongoose");

var mongoUrl = 'mongodb+srv://new-user-23:user%4023@cluster0.k9rbwio.mongodb.net/mern-rooms4u'

mongoose.connect(mongoUrl, {useUnifiedTopology: true, useNewUrlParser: true})

var connection = mongoose.connection

connection.on('error' ,()=>{
console.log('MongoDB connection failed')
})
connection.on("connected",()=> {
    console.log('MongoDB connection is succesful')
})

module.exports = mongoose;