import React from "react";
import "./banner.css";
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Banner = () =>(
    <div class="container-fluid" id="banner-container">
        
        <div class = "row mb-5">

            <div class = "col-md-5 col-sm-12 pt-5 ps-lg-5" id="banner-left-col">
                <h1 class="display-1 text-start ps-5">Hi, I'm <span class="text-primary fw-bold">Vincenzo</span>.</h1>
                <p class="pt-1 h5 fw-light text-start ps-5" id="opening-bio">
                    Inspired by the ever-evolving nature of software and AI, I envision creative, intuitive solutions to any given problem, whether simple or complex.
                    <br></br>
                    <br></br>
                    <span class="fw-normal">
                        "Innovation is the only way to win."
                        <br></br>
                        — Steve Jobs
                    </span>
                </p>
            </div>
        </div>

    
        
        
    </div>
    
);


export default Banner