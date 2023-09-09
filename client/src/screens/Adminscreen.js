import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Loader from '../components/Loader.js';
import Error from '../components/Error.js';
import { Tabs } from 'antd';
const { TabPane } = Tabs;


function Adminscreen() {
    return (
        <div className='mt-3 ml-5 bs'>
            <h2 className='text-center' style={{ fontSize: '30px' }}><b>Admin Panel</b></h2>
            <Tabs defaultActiveKey="2">
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <h1>Rooms</h1>
                </TabPane>
                <TabPane tab="Add Rooms" key="3">
                    <h1>Add Rooms</h1>
                </TabPane>
                <TabPane tab="Users" key="4">
                    <h1>Users</h1>
                </TabPane>
            </Tabs>
        </div >
    )
}

export default Adminscreen

export function Bookings() {
    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()

    useEffect(async () => {
        try {
            const data = await (await axios.get('/api/bookings/getallbookings')).data
            setbookings(data)
            setloading(false)
        } catch (error) {
            console.log(error.message)
            setloading(false)
            seterror(error)
        }
    }, [])

    return (
        <div className="row">
            <div className="col-md-10">
                <h1>Bookings</h1>
                {loading && (<Loader />)}
                {bookings.length && (<h1> Tehre are total {bookings.length} bookings</h1>)}
            </div>
        </div>
    )
}