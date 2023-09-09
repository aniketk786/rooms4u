import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../components/Room.js'
import Loader from '../components/Loader.js';
import 'antd/dist/reset.css';
import Error from '../components/Error.js';
import moment from 'moment';
import { DatePicker, Space } from 'antd';


function Homescreen() {

  const [data, setData] = useState([])
  const [loading, setloading] = useState()
  const [error, seterror] = useState()
  const { RangePicker } = DatePicker;

  const [fromdate, setfromdate] = useState()
  const [todate, settodate] = useState()

  const [duplicaterooms, setduplicaterooms] = useState()

  const [searchkey, setsearchkey] = useState('')
  const [type, settype] = useState('all')
  useEffect(() => {
    const fetchData = async () => {

      try {
        setloading(true)
        const { data: response } = await axios.get('/api/room/getallrooms');
        setData(response);
        setduplicaterooms(response)
        setloading(false)
      } catch (error) {
        seterror(true)
        console.error(error.message);
        setloading(false)
      }

    }

    fetchData();
  }, []);

  function filterByDate(dates) {
    //     // console.log((dates[0]).format('DD-MM-YYYY'))
    //     // console.log((dates[1]).format('DD-MM-YYYY'))

    //     setfromdate((dates[0]).format('DD-MM-YYYY'))
    //     settodate((dates[1]).format('DD- MM-YYYY'))
    const from = (dates[0]).format('DD-MM-YYYY');
    const to = (dates[1]).format('DD-MM-YYYY');
    setfromdate(from);
    settodate(to);

    var temprooms = [];
    var availability = false;

    for (const room of duplicaterooms) {

      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
            && !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)) {

            if (
              moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
              moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
              moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
              moment(dates[1]).format('DD-MM-YYYY') !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability === true || room.currentbookings.length == 0) {
        temprooms.push(room)
      }
      setData(temprooms)
    }
  }

  function filterBySearch() {

    const temprooms = duplicaterooms.filter(data => data.name.toLowerCase().includes(searchkey.toLowerCase()));
    setData(temprooms)
  }

  function filterByType(e) {
    settype(e)
    if (e !== 'all') {
      const temprooms = duplicaterooms.filter(data => data.type.toLowerCase() == e.toLowerCase);
      setData(temprooms)
    }
    else {
      setData(duplicaterooms)
    }
  }
  return (
    <div className='container'>

      <div className='row mt-5 bs'>
        <div className="col-md-3">
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>

        <div className="col-md-3 ">
          <input type='text' className='form-control' placeholder='search rooms'

            value={searchkey} onChange={(e) => { setsearchkey(e.target.value) }} onKeyUp={filterBySearch}
          />
        </div>


        {/* <select className='form-control del' value={type} onChange={(e)=>(filterByType(e.target.value))}> 
          <option value='all'>All</option>
          <option value='delux'>Delux</option>
          <option value='non-delux'>Non Delux</option>
        </select> */}
      </div>

      <div className="row justify-container-center mt-5">

        {loading ? (
          <Loader />
        ) : (
          data.map((room) => {
            return <div className="col-md-9 mt-2">
              <Room room={room} fromdate={fromdate} todate={todate} />
            </div>
          })
        )}
      </div>
    </div>
  );
};

export default Homescreen