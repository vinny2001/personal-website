import React from "react";
import "./biography.css";

const Biography = () => (
    <div class="container-fluid shadow" id="biography-container">

        {/* Separator div */}
        <div class="row" id="banner-bio-separator"></div>

        {/* Main bio div */}
        <div class="row py-5">

            {/* Biography image */}
            <div class="col-lg-6 col-sm-12 my-auto" id="bio-img-div">
                <img src="https://media.licdn.com/dms/image/D5603AQH19Ktc6PQTDQ/profile-displayphoto-shrink_800_800/0/1682372010382?e=2147483647&v=beta&t=lpTBPEkdyoh6IOS39UTypqFnsKH4agtpFnHUUwB8bJs" alt="Image of Vincenzo D'Aria" class="img-fluid shadow rounded text-center justify-content-center" id="bio-img"></img>
            </div>

            {/* Biography paragraph */}
            <div class = "col-lg-6 col-sm-12">
                <h3 class ="h3 text-white text-center">
                    A Bit About Me
                </h3>

                <p class="text-white text-start p-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus eget nunc scelerisque viverra mauris in. Amet consectetur adipiscing elit ut aliquam purus sit amet. Purus in mollis nunc sed id semper risus in hendrerit. Sit amet cursus sit amet dictum. Commodo quis imperdiet massa tincidunt nunc. Viverra tellus in hac habitasse platea dictumst. Id ornare arcu odio ut. Eros donec ac odio tempor orci dapibus. Turpis egestas integer eget aliquet. Maecenas accumsan lacus vel facilisis volutpat. Consectetur a erat nam at lectus urna duis convallis convallis. Sed risus pretium quam vulputate dignissim suspendisse in est ante. Aliquam id diam maecenas ultricies mi eget mauris pharetra. In est ante in nibh mauris cursus. Amet venenatis urna cursus eget nunc. Ut faucibus pulvinar elementum integer. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Et magnis dis parturient montes nascetur ridiculus mus. Aliquam malesuada bibendum arcu vitae.
                    <br></br>
                    <br></br>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Morbi non arcu risus quis varius quam quisque id. Egestas sed sed risus pretium quam vulputate. Turpis tincidunt id aliquet risus feugiat. Faucibus pulvinar elementum integer enim neque volutpat. Tristique nulla aliquet enim tortor at auctor. Lectus nulla at volutpat diam ut venenatis tellus in metus. Vitae sapien pellentesque habitant morbi tristique. Purus sit amet luctus venenatis.
                </p>
            </div>

        </div>

    </div>
);


export default Biography
