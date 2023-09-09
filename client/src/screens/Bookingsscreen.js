import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios"
import Loader from "../components/Loader.js";
import Error from '../components/Error';
import Succesful from '../components/Succesful';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2'


function Bookingsscreen() {
  let { roomid, fromdate, todate } = useParams()
  // const params = useParams();
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [room, setroom] = useState();

  const firstdate = moment(fromdate, 'DD-MM-YYYY')
  const lastdate = moment(todate, 'DD-MM-YYYY')

  const [totalamount, settotalamount] = useState();

  const totaldays = moment.duration(lastdate.diff(firstdate)).asDays() / 30
  const totalmonth = totaldays.toFixed(2)
  // const totalamount = room ? room.rentpermonth * totalmonth : 0

  useEffect(() => {
    const fetchRoomById = async () => {
      setloading(true);
      try {

        setloading(true)
        const { data: response } = await axios.post('/api/room/getroombyid', { roomid: roomid });
        settotalamount(response.rentpermonth * totaldays)
        setroom(response);
        setloading(false)
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    };
    fetchRoomById();

  }, []);

  async function bookRoom() {

  }

  async function onToken(token) {
    console.log(token)
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem('current_user'))._id,
      fromdate,
      todate,
      totalamount,
      totalmonth,
      token

    }
    try {
      setloading(true);
      // const { data: response } = await axios.post('/api/bookings/bookroom', bookingDetails)
      const result = await axios.post('/api/bookings/bookroom', bookingDetails)
      Swal.fire('Congratulations', 'Your Room has been booked successfully', 'success')
      setloading(false);
      window.location.href = '/home'
    } catch (error) {
      setloading(false);
      Swal.fire('Oops', 'Something went wrong', 'error')
    }
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : room ? (
        <div className="m-5">
          <div className="row justify-contet-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className='bigimg' />
            </div>

            <div className="col-md-6">
              <div>
                <h1>Booking Details</h1>
                <hr></hr>
                <p><b>Name :</b>{JSON.parse(localStorage.getItem('current_user')).name}</p>
                <p><b>From :</b>{fromdate} </p>
                <p><b>to : </b>{todate} </p>
                <p><b>Maxcount :</b>  {room.maxcount}</p>
              </div>

              <div className="mt-5">
                <h1><b>Rent</b></h1>
                <hr />
                <p><b>Contract month :</b> {totalmonth}</p>
                <p><b>Rent per month :</b> {room.rentpermonth} </p>
                <p><b>total amount : </b>{totalamount} </p>
              </div>

              <div style={{ float: 'right' }}>

                <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  currency='INR'
                  stripeKey="pk_test_51NLVbwSAjHFb9X3zvYlRCP5bwY0eYufAuLgh7Awzt84JQTvrPiLvNXGXHCMXYZwAHZwq9aug5moRS8UpxFmz9x5200FiESbnGc"
                >
                  <button type="button" className="btn btn-primary" >Pay Now{" "}</button>
                </StripeCheckout>

              </div>
            </div>
          </div>

        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingsscreen