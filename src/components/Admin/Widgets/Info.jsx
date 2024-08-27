import React, { useEffect, useState } from "react";
import one_thought from "../../../assets/one_thought.jpg";
import logo from "../../../assets/logo.png";
import { Button } from "@mui/material";
import { BiSolidSkipNextCircle } from "react-icons/bi";

const Info = () => {
  const [isLeaving, setIsLeaving] = useState(false);
  const [hasLeft, setHasLeft] = useState(false);
  const justLoggedIn = localStorage.getItem("justLoggedIn");

  useEffect(() => {
    if (justLoggedIn == "false") {
      setHasLeft(true);
    }
  }, []);

  const handleNext = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setHasLeft(true);
      localStorage.setItem("justLoggedIn", false);
    }, 1000);
  };

  return (
    <div
      className={`info-widget-container ${
        hasLeft && justLoggedIn == "false" ? "hidden" : "flex"
      }`}
    >
      <div className="wrapper">
        <div
          className={`info-widget bg-white ${
            isLeaving ? "move_up" : "move_down"
          }  block`}
        >
          <img src={logo} className="w-10 h-10 mx-auto my-4" alt="Unicef" />
          <h3 className="text-sm md:text-xl font-extrabold text-center">
            Welcome to the{" "}
            <span className="italic font-bold text-red-500">
              UNICEF SURVEY{" "}
            </span>
            admininistrator app.
          </h3>
          <p className="text-green-600 text-center my-4 text-sm">
            In patnership with GLO and Oxford, we aim to make the world a better
            place for future generations...
          </p>
          <p className="text-green-600 text-center my-4 text-sm">
            With the software, we keep track of the voices of individuals, who
            are caregivers to children , to get a common ground of situations,
            resulting in how to help, and building future prospects.
          </p>
          <p className="text-green-600 text-center my-4 text-sm">
            Whether as an admin or agent, we appriciate you for being in this
            jorney with us.
          </p>

          <div className="mt-10 mb-2">
            <Button
              variant="contained"
              color="primary"
              className="text-white text-sm flex flex-row place-items-center gap-x-2  "
              onClick={handleNext}
            >
              Continue <BiSolidSkipNextCircle />
            </Button>
          </div>
        </div>
        <div className="developer float-end">
          <p className="text-red-600 text-xs font-bold text-center mt-10">
            Powered By
          </p>

          <img
            src={one_thought}
            alt=""
            className="w-10 h-10 rounded-full mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Info;
