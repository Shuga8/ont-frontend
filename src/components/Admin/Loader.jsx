import React, { useEffect } from "react";
import { TbLoader3 } from "react-icons/tb";

const Loader = ({ leave = true }) => {
  if (leave) {
    useEffect(() => {
      setTimeout(() => {
        document.querySelector(".preloader").style.display = "none";
      }, 800);
    }, []);
  }
  return (
    <div className="preloader">
      <span className="">
        <TbLoader3 />
      </span>
    </div>
  );
};

export default Loader;
