import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Tabs } from 'antd';
import Loader from '../components/Loader.js';
import Error from '../components/Error.js';
const { TabPane } = Tabs;

function Profilescreen() {

    const user = JSON.parse(localStorage.getItem('current_user'));

    useEffect(() => {

        if (!user) {
            window.location.href = '/login';
        }
    }, [])

    return (
        <div className='ms-3 mt-3'>
            <Tabs defaultActiveKey="1">
                {/* {items.map(item => (
          <TabPane tab={item.label} key={item.key}>
            {item.children}
          </TabPane>
        ))} */}
                <TabPane tab="Profile" key="1" className='bs rtmg'>
                    <h1>My Profile</h1>
                    <br />
                    <h1><b>Name</b> : {user.name}</h1>
                    <h1><b>Email</b> : {user.email}</h1>
                    <h1><b>isAdmin</b> : {user.isAdmin ? 'Yes' : 'No'}</h1>


                </TabPane>
                {/* <TabPane tab="Bookings" key="2">
                    <MyBookings />
                    
                </TabPane> */}
            </Tabs>
        </div>
    )
}

export default Profilescreen



export function MyBookings() {
    const user = JSON.parse(localStorage.getItem('current_user'));
    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(null);

    useEffect(async () => {
        try {
            setloading(true);
            const data = await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id })
            console.log(data)
            setbookings(data)
            console.log(bookings, 61)

        } catch (error) {
            console.log(error)
            setloading(false)
            seterror(error)
        }
    }, []);


    return (
        <div>
            <div className="row ">
                <div className="col-md-6">
                    {loading && ( <Loader />)}
                    {bookings && (bookings.map((booking) => {
                        return (
                        <div className="bs">
                            <h1>{booking.room}</h1>
                            <h1>BookingId: {booking._id}</h1>
                        </div>
                        )
                    }))}
                    {error && <Error message={error.message}/>}
                </div>
            </div>
        </div>
    );
}
