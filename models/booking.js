const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({

        room : {
            type: String, required: true
        },
        roomid : {
            type: String, required: true
        },
        userid: {
            type: String, required: true
        },
        fromdate:{
            type: String, required: true
        },
        todate:{
            type: String, required: true
        },
        totalamount: {
            type: Number, required: true
        },
        totalmonth:{
            type: Number, required: true
        },
        transactionid: {
            type: String, required: true
        },
        status: {
                   type: String, required: true, default: 'booked'
                }

},{
    timestamps: true
});

const bookingmodel = mongoose.model('Booking', bookingSchema);

module.exports = bookingmodel;