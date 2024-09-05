import React from "react";
import Skeleton from "./Skeleton";

const TableSkeleton = ({ count = 5 }) => {
  const renderSkeletonRows = () => {
    return Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="grid grid-cols-3 border-b border-stroke dark:border-stone-200 sm:grid-cols-5 py-3 md:py-0"
      >
        <div className="flex items-center p-2 xl:p-2">
          <Skeleton type={"table-short-text"} />
        </div>
        <div className="items-center p-2 xl:p-2 hidden md:block">
          <Skeleton type={"table-long-text"} />
        </div>
        <div className="flex items-center p-2 xl:p-2">
          <Skeleton type={"table-long-text"} />
        </div>
        <div className="items-center justify-center p-2 xl:p-2 hidden md:flex">
          <Skeleton type={"table-long-text"} />
        </div>
        <div className="flex items-center justify-center p-2 xl:p-2">
          <Skeleton type={"table-long-text"} />
        </div>
      </div>
    ));
  };

  return <>{renderSkeletonRows()}</>;
};

export default TableSkeleton;
