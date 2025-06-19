import React from "react";
import ScienceCatalogue from "../MyComponents/ScienceCatalogue";
import SubjectCards from "../MyComponents/SubjectCards";
import { NavLink } from 'react-router-dom';
import bg from './../images/scienceimg.gif'
import Banner from '../MyComponents/banner';

function Science() {
  return (
    <div>
      <div>
        <img src={bg} alt="bg" width={"100%"} height="400" class="acc1"></img>
        <div class="position-relative"></div>
        <div class="position-absolute top-50 start-50 translate-middle">
          <p class="text-warning display-3 fw-semibold">
          </p>
          <p class="text-white fs-3 fw-light my-1">
          </p>
            </div>
      </div>
      <ScienceCatalogue />
    </div>
  );
}

export default Science;
