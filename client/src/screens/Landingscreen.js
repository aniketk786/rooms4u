import React from 'react'
import {Link} from 'react-router-dom'

function Landingscreen() {
    return (
        <div className='row landing justify-content-center'>
            <div className='col-md-9 my-auto text-center' style={{borderRight: '5px solid white'}}>
                <h2 style={{color: 'white', fontSize: '120px'}}>Rooms4U</h2>
                <h1 style={{color: 'white'}}>Let us help you to find the perfect room - Start your search today!!</h1>
                <Link to='/home'>
                    <button className='btn landing-btn' style={{color: 'black', backgroundColor: 'white'}}>Get Started</button>
                </Link>
            </div>
        </div>
    )
}

export default Landingscreen