import React from "react";
import "./research.css";
import ResearchEntry from "./researchEntry/researchEntry";

function Research(){
    return(

        <>
        <div className="MainResearch container-fluid" id="research-container">

            <div class="row py-5">
                <h1 class="display-1 text-start ps-5">
                    My <span class="fw-bold text-primary">Research</span>
                </h1>
            </div>

            <div class="row pb-5">
                <div class="col-md-5 col-sm-12 ps-5">
                    <p class="h5 fw-light text-start">
                        Research has been a main source of my love for computer science during my undergraduate years. Below is a compilation of my research and publications to-date:
                    </p>
                </div>
            </div>
        </div>
        
        <div className="ResearchSections">
            <ResearchEntry />
        </div>

        </>
        
    );
}

export default Research;

