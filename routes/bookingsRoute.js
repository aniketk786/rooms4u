const express = require('express')
const router = express.Router()
const Room = require('../models/room')
const Booking = require('../models/booking.js')
const moment = require('moment')
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51NLVbwSAjHFb9X3zdYO87aejqJZyJ7YJmy8RTwS0rvlyNyLproAQFygLJ68PJdSXukGnN9mm3jEQntHfRBu5SYB900lQVaGRWP')


router.post('/bookroom', async (req, res) => {
    const { room, userid, fromdate, todate, totalamount, totalmonth, token } = req.body

    // console.log(token)
    // console.log(userid)
    // console.log(fromdate)
    // console.log(todate)
    // console.log(totalamount)
    // console.log(totalmonth)
    // console.log(room) 
    console.log(token.email);
    try {
        console.log("try block");
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        console.log("email")
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalamount * 100,
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
        });
        // const payment = await stripe.charges.create(
        //     {
        //         amount: totalamount * 100,
        //         customer: customer.id,
        //         currency: 'usd',
        //         receipt_email: token.email
        //     }, {
        //     idempotencyKey: uuidv4()
        // }
        // )
        // console.log(payment)

        if (paymentIntent) {
            // try {
            const newbooking = new Booking({
                room: room.name,
                roomid: room._id,
                userid,
                fromdate: moment(fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
                todate: moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
                totalamount,
                totalmonth,
                transactionid: '1234'
            })
            console.log("newbooking", newbooking);
            const booking = await newbooking.save()

            const roomtemp = await Room.findOne({ _id: room._id })

            if (!roomtemp) {
                throw new Error('Room not found');
            }
            console.log("roomtemp", roomtemp)

            roomtemp.currentbookings.push({
                bookingid: booking._id,
                fromdate: moment(fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
                todate: moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
                userid,
                status: booking.status
            });
            console.log(roomtemp.currentbookings);
            await roomtemp.save()

            //     res.send('Room Booked Successfully')
            // } catch (error) {
            //     console.error(error)
            //     return res.status(400).json({ error: 'An error occurred while booking the room' })
            // }
        }

        console.log("success");
        res.send("Payment Successful your room is booked")
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: error.message })  //({ error : 'An error occurred while booking the rm'})
    }

});
router.post("/getbookingsbyuserid", async (req, res) => {
    const userid = req.body.userid

    try {
        const bookings = await Booking.find({ userid: userid })
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error: error.message }) //({ error :
    }
})

router.get("/getallbookings", async(req, res) => {
    try {
        const bookings = await Booking.find()
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error })
    }
});

module.exports = router;
