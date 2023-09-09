import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


function Navbar() {
    const user = JSON.parse(localStorage.getItem("current_user"));

    function logout() {
        localStorage.removeItem("current_user");
        window.location.href = "/login";
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Rooms4U</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"> <i class="fas fa-bars" style={{color: "#fcfcfd", marginRight: '0.5em'}}></i> </span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav  mb-2 mb-lg-0 me-5">
                            {user ? (<>
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="/home">Home</a>
                                </li>
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {user.name}
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="/profile">Profile</a></li>
                                        <li><a class="dropdown-item" href="#" onClick={logout}>Logout</a></li>
                                    </ul>
                                </div>
                            </>) : (<>
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="/home">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/register">Sign Up</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/login">Log In</a>
                                </li>
                            </>)}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;