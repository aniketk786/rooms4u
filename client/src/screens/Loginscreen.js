  import React from 'react'
  import { useState, useEffect } from 'react'
  import Loader from "../components/Loader.js";
  import Error from '../components/Error';

  import axios from 'axios'

  function Loginscreen() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    async function login() {

      const user = {
        email,
        password
      }
      try {
        setloading(true);
        const response = await axios.post('/api/users/login', user);
        const result = response.data;
        setloading(false);

        localStorage.setItem('current_user', JSON.stringify(result));
        window.location.href = '/home';
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);

      }
    }

    return (
      <div>
        {loading && <Loader />}

        <div class="row  justify-content-md-center mt-5">
          <div class="col-md-5 ">
            {error && <Error message="Invalid Credentials" />}
            <div className='bs'>
              <h2 >Log In</h2>
              <input type="text" className="form-control" placeholder="Email"
                value={email} onChange={(e) => { setemail(e.target.value) }} />
              <input type="password" className="form-control mt-3" placeholder="Password"
                value={password} onChange={(e) => { setpassword(e.target.value) }} />


              <button className="btn btn-primary mt-3" onClick={login}>login</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  export default Loginscreen