import React from "react";

const Unauthorized = () => {
  return (
    <div className="w-full h-screen bg-gray-700 text-red-700 flex items-center justify-center flex-col gap-y-10">
      <h1 className="text-white font-semibold text-3xl">401</h1>
      <p className="text-white italic">
        You are unauthorized to access this page.
      </p>
    </div>
  );
};

export default Unauthorized;
