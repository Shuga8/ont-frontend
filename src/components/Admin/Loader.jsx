import React, { useEffect } from "react";

const Loader = () => {
  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".preloader").style.display = "none";
    }, 800);
  }, []);
  return (
    <div className="preloader">
      <span className="material-symbols-outlined">progress_activity</span>
    </div>
  );
};

export default Loader;
