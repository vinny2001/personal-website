import React from "react";

const Navbar = () =>(

    <nav className="navbar">
        <div className="container-fluid">

            <ul className="navbar-nav flex-row px-2 pt-3">

                <li className="nav-item mx-lg-4 mx-2">
                    <a className="nav-link" href="/">Home</a>
                </li>  

                <li className="nav-item mx-lg-4 mx-2">
                    <a className="nav-link disabled" href="/#/">Skills</a>
                </li>

                <li className="nav-item mx-lg-4 mx-2">
                    <a className="nav-link disabled" href="/#/portfolio">Projects</a>
                </li>

            </ul>

        </div>
    </nav>
);

export default Navbar