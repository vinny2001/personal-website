import React from "react";
import "./biography.css";

const Biography = () => (
    <div class="container-fluid" id="biography-container">

        {/* Separator div */}
        <div class="row" id="banner-bio-separator"></div>

        {/* Main bio div */}
        <div class="row py-5 justify-content-center">

            {/* Biography image */}
            <div class="col-lg-6 col-sm-12 my-auto" id="bio-img-div">
                <img src="https://media.licdn.com/dms/image/D5603AQH19Ktc6PQTDQ/profile-displayphoto-shrink_800_800/0/1682372010382?e=2147483647&v=beta&t=lpTBPEkdyoh6IOS39UTypqFnsKH4agtpFnHUUwB8bJs" alt="Image of Vincenzo D'Aria" class="img-fluid shadow rounded text-center justify-content-center" id="bio-img"></img>
            </div>

            {/* Biography paragraph */}
            <div class = "col-lg-5 col-sm-11 " id="bio-paragraph-div">
                <h2 class ="h2 text-center pt-2 fw-light">
                    A Bit About Me
                </h2>

                <p class="text-start p-4 fw-light">
                    I am a 4th-year computer science student at Central Connecticut State University. I am also a part of the CCSU Honors College, and a National Science Foundation
                    CSMP Scholar. I am currently concluding my internship as a full-stack software engineer for Travelers Insurance and searching for future career prospects.
                    <br></br>
                    <br></br>
                    To say that my experience as a computer science student and an emerging professional is enriching... is truly an understatement. I am privileged to have had various inspirations
                    and mentors so far in my journey forward, and they have all shaped me as a driven, creative individual. I have learned that I am passionate about machine learning AI,
                    biomedical technology, and full-stack development.
                    <br></br>
                    <br></br>
                    I hope to leverage my current talents and skills, all while improving upon my passions. Technology moves quickly, and I am eager to be a part of this movement and make my
                    own impact on the world.
                </p>
            </div>

        </div>

    </div>
);


export default Biography
