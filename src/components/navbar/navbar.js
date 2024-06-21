import React from "react";
import {ImHome} from "react-icons/im"

const Navbar = () =>(

    <nav class="navbar navbar-expand-md">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <ImHome size={25} color="darkslategray"></ImHome>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav align-items-start px-2 pt-3">

                    <li class="nav-item">
                        <a class="nav-link" href="/">Home</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link disabled" href="/#/portfolio">Portfolio</a>
                    </li>
                    
                </ul>
            </div>
        </div>
    </nav>
);

export default Navbar