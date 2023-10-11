import React from "react";
import {ImHome} from "react-icons/im"

const Navbar = () =>(

    <nav class="navbar navbar-dark navbar-expand-lg bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand text-white" href="/">
                <ImHome size={30}></ImHome>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">

                    <li class="nav-item">
                        <a class="nav-link" href="/">Home</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link " href="/research">Research</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link disabled " href="#">Projects</a>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#">Contact</a>
                    </li>
                    
                </ul>
            </div>
        </div>
    </nav>
);

export default Navbar