import React from "react";

const ErrorPage = () => {
  return (
    <div className="w-full h-screen bg-gray-700 text-red-700 flex items-center justify-center flex-col gap-y-10">
      <h1 className="text-white font-semibold text-3xl">404</h1>
      <p className="text-white italic">
        The page you are looking for could not be found
      </p>
    </div>
  );
};

export default ErrorPage;
