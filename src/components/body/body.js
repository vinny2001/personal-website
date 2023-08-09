// 1. Always import react for each component
import React from "react";
import "./body.css";
import Banner from "./banner/banner";

function Body() {
    return (
        <div className="Body">
            <Banner/>
        </div>

    );
  }
  
  export default Body;