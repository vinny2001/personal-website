import React from "react";
import {ImHome} from "react-icons/im"

const Navbar = () =>(

    <nav className="navbar navbar-expand-md">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">
                <ImHome size={25} color="darkslategray"></ImHome>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav align-items-start px-2 pt-3">

                    <li className="nav-item">
                        <a className="nav-link" href="/">Home</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link disabled" href="/#/portfolio">Portfolio</a>
                    </li>
                    
                </ul>
            </div>
        </div>
    </nav>
);

export default Navbar