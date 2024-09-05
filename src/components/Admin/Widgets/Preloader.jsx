import React from "react";
import { RiLoader2Line } from "react-icons/ri";

const Preloader = ({ isVisible = false }) => {
  return (
    <div
      className={`readyStateLoader ${isVisible ? "flex" : "hidden"}`}
      id="readyStateLoader"
    >
      <span className="text-blue-500 text-5xl spinner">
        <RiLoader2Line />
      </span>
      <span className="text-base text-white">
        Please wait, your upload is being proccessed
      </span>
    </div>
  );
};

export default Preloader;
