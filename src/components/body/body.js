// 1. Always import react for each component
import React from "react";
import "./body.css";
import Banner from "./banner/banner";
import Biography from "./biography/biography";

function Body() {
    return (
        <div className="Body">
            <Banner/>
            <Biography/>
        </div>

    );
  }
  
  export default Body;