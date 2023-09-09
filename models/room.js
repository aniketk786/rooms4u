const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    name : {
        type: String, 
        required: true
    },
    maxcount: {
        type: Number,
        required: true
    },
    phonenumber:{
        type : Number,
        required : true
    },
    rentpermonth:{
        type :Number,
        required: true
    }, 
    type :{
        type : String,
        required: false
    },
    imageurls: [],
    currentbookings: [],


}, 
{
    timestamps : true, 
})

const roomModels = mongoose.model('room', roomSchema)

module.exports = roomModels; 