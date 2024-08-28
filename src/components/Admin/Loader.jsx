import React, { useEffect } from "react";
import { BiLoaderAlt } from "react-icons/bi";

const Loader = () => {
  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".preloader").style.display = "none";
    }, 800);
  }, []);
  return (
    <div className="preloader">
      <span className="">
        <BiLoaderAlt />
      </span>
    </div>
  );
};

export default Loader;
