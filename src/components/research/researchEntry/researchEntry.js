import React from "react";
import "./researchEntry.css";

function ResearchEntry(){
    return(
        <div class="container-fluid" id="research-entry-container">

            {/* Separator div */}
            <div class="row" id="banner-bio-separator"></div>
        
            <div class="row">

                {/* Section Narrative */}
                <div class="col-lg-6 col-sm-12">
                    <h2 class ="h2 text-start ps-5 fw-light pt-5">
                        Undergraduate Thesis Publication:
                        <hr class="hr"></hr>
                    </h2>
                    
                    <p class="lead text-start ps-5 fw-light">
                        Neural Networks Implemented through Bio-Nanorobots 
                        for the Early Detection and Elimination of Cancer Cells in the Human Body:
                        <hr class="hr"></hr>
                    </p>

                    <p class="lead text-start ps-5 fw-light">
                        Source: <a href="https://cscu-ccsu-primo.hosted.exlibrisgroup.com/primo-explore/fulldisplay?docid=01CSCU_NETWORK_ALMA71210764550003451&vid=CCSU_V1&lang=en_US&context=L" target="_blank" id="thesis_link"> View Publication via CCSU Library Website</a>
                        <hr class="hr"></hr>
                    </p>

                    <p class="text-start ps-5 fw-normal">
                    
                        In both the computer science and healthcare fields, cutting-edge neural network and nanorobotics 
                        research is being combined with the ever-growing demand for early-stage cancer detection and 
                        elimination methods, which this thesis narrative explores. Studies from researchers who have 
                        experimented with convolutional neural networks, graph neural networks, and bio-nanorobots in 
                        applications such as early-stage cancer cell detection, micro-surgeries, and targeted drug delivery 
                        were analyzed along with studies involving current cancer detection and elimination methods for 
                        comparison. These studies, along with any collected data, originated from scientific databases, 
                        primary sources, journals, textbooks, and conference proceedings, such as IEEE, ACM, Pearson, 
                        and Springer. Although results have been preliminary in these experiments due to the research 
                        base being relatively new, this narrative explores new ways in which neural networks and 
                        nanorobots can be used to traverse the human body and more effectively eliminate cancer cells 
                        compared to traditional methods. Relation Structure-Aware Heterogeneous Graph Neural 
                        Networks (RSHNs) in bio-nanorobots for more efficient mapping and traversal of the human body, 
                        convolutional neural network computer vision in bio-nanorobots for more effective cancer cell 
                        detection, and the ethical considerations of these processes are used for facilitating early-stage 
                        cancer detection and elimination.
                        
                        <hr class="hr"></hr>
                    </p>

                </div>

                {/* Section Image */}
                <div class="col-lg-6 col-sm-12 my-auto">
                    <img src="/images/vinny_poster_presentation.jpg" alt="Vincenzo D'Aria Thesis Poster Presentation" class="img-fluid rounded text-center justify-content-center p-5" id="thesis-img"></img>
                </div>

            </div>
        </div>
    );

}
export default ResearchEntry;