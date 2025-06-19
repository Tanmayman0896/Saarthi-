import React from "react";
import About1 from './../MyComponents/About1';
import bg from './../images/aboutus.png'

function Aboutus() {
  return (
    <div>
      <div>
        <img src={bg} width={"100%"} height="600" class="acc1" alt="bg"></img>
        <div class="position-relative"></div>
        <div class="position-absolute top-50 start-50 translate-middle">
        {/* <p class="text-blue-700 display-6 fw-semibold my-1">For One and All</p> */}
        </div>
      </div>
      <About1/>
    </div>
  );
}

export default Aboutus;
