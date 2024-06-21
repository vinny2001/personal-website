// src/Body.js
import React, { useState, useEffect } from "react";
import "./body.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Body() {
    const [isVisible, setIsVisible] = useState({
        title: false,
        paragraph1: false,
        paragraph2: false,
        paragraph3: false,
        icons: false,
        copyright: false
        
    });

    useEffect(() => {
        const delay = 1000; // Adjust delay between animations

        setTimeout(() => {
            setIsVisible(prevState => ({ ...prevState, title: true }));
        }, delay * .1);

        setTimeout(() => {
            setIsVisible(prevState => ({ ...prevState, paragraph1: true }));
        }, delay * .25);

        setTimeout(() => {
            setIsVisible(prevState => ({ ...prevState, paragraph2: true }));
        }, delay * .5);

        setTimeout(() => {
            setIsVisible(prevState => ({ ...prevState, paragraph3: true }));
        }, delay * .75);

        setTimeout(() => {
            setIsVisible(prevState => ({ ...prevState, icons: true }));
        }, delay * 1);

        setTimeout(() => {
            setIsVisible(prevState => ({ ...prevState, copyright: true }));
        }, delay * 1.25);
    }, []);

    return (
        <div className="Body">
            <div className="container">
                <div id="bodyTitle" className={`opacity-transition ${isVisible.title ? 'delay-transition' : ''}`}>
                    <div className="row justify-content-center text-center header-container mt-5 mb-3">
                        <h3 id="greetingHeading">Hello, I'm Vincenzo</h3>
                    </div>
                </div>

                <div id="bodyContent" className="bodyContent">
                    <div className="row text-start mb-5 px-2">
                        <div className="col-lg-6 col-sm-10 mx-auto">
                            <p className={`opacity-transition ${isVisible.paragraph1 ? 'delay-transition' : ''}`}>
                                I'm a software engineer at Travelers Insurance who specializes in developing full stack, data-driven, cloud-based applications.
                            </p>
                            <hr className={`opacity-transition ${isVisible.paragraph1 ? 'delay-transition-hr' : ''}`}/>
                            <p className={`opacity-transition ${isVisible.paragraph2 ? 'delay-transition' : ''}`}>
                                I recently graduated from Central Connecticut State University with my BS in Computer Science. At CCSU, I gained hands-on experience with a variety of tools and technologies. 
                                including developing a full stack mobile application for a local non-profit, publishing my research thesis on the use of AI-powered nano-pharmacytes for targeted cancer remediation,
                                and learning different levels of theory, programming languages, frameworks, and development stacks.
                            </p>
                            <hr className={`opacity-transition ${isVisible.paragraph2 ? 'delay-transition-hr' : ''}`}/>
                            <p className={`opacity-transition ${isVisible.paragraph3 ? 'delay-transition' : ''}`}>
                                I am always excited to learn more and connect with other like-minded individuals. Let's talk about it!
                            </p>
                            <hr className={`opacity-transition ${isVisible.paragraph3 ? 'delay-transition-hr' : ''}`}/>
                            <div className={`m-2 icon-container opacity-transition ${isVisible.icons ? 'delay-transition' : ''}`} style={{ display: 'flex', gap: '10px' }}>
                                <a href="https://www.linkedin.com/in/vincenzodaria" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faLinkedin} size="2x" color="black" />
                                </a>
                                <a href="https://github.com/vinny2001" target="_blank" rel="noopener noreferrer" className="mx-3">
                                    <FontAwesomeIcon icon={faGithub} color="black" size="2x" />                 
                                </a>
                                <a href="mailto:vincenzo.daria01@gmail.com" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faEnvelope} color="black" size="2x" />
                                </a>
                            </div>

                            <hr className={`copy-right opacity-transition ${isVisible.copyright ? 'delay-transition-hr' : ''}`}/>
                            <small className={`copy-right opacity-transition ${isVisible.copyright ? 'delay-transition' : ''}`}>Copyright Vincenzo D'Aria &copy; 2024, all rights reserved</small>
                            
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Body;
