import React from 'react'
import { useState, useEffect } from 'react'
import Loader from "../components/Loader.js";
import Error from '../components/Error';
import Succesful from '../components/Succesful';
import axios from 'axios';

function Registerscreen() {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();

  async function register() {
    if (password == confirmPassword) {
      const user = {
        name,
        email,
        password,
        confirmPassword
      }
      try {
        setloading(true);
        const result = await axios.post('/api/users/register', user).data
        setloading(false);
        setsuccess(true);

        setname('')
        setemail('')
        setpassword('')
        setconfirmPassword('')

      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    }
    else {
      alert('password and confirm password not match')
    }
  }

  return (
    <div>
      {loading && (<Loader />)} 
      {error && (<Error />)}
      

      <div class="row  justify-content-md-center mt-5">
        <div class="col-md-5 ">
        {success && (<Succesful message="Registration Successful"/>)}
          <div className='bs'>
            <h2 >Sign Up</h2>
            <input type="text" className="form-control" placeholder="name"
              value={name} onChange={(e) => { setname(e.target.value) }} />
            <input type="text" className="form-control mt-2" placeholder="email"
              value={email} onChange={(e) => { setemail(e.target.value) }} />
            <input type="text" className="form-control mt-2" placeholder="password"
              value={password} onChange={(e) => { setpassword(e.target.value) }} />
            <input type="text" className="form-control mt-2" placeholder="confirm password"
              value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }} />

            <button className="btn btn-primary mt-3" onClick={register}>Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registerscreen