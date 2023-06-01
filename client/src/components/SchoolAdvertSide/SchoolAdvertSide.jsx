import React from "react";
import SchoolAdverts from "../SchoolAdverts/SchoolAdverts"
import SchoolAdvertShare from "../SchoolAdvertShare/SchoolAdvertShare";
import "./SchoolAdvertSide.css";

const SchoolAdvertSide = () => {
  return (
    <div className="SchoolAdvertSide">
      <SchoolAdvertShare location={"new"} />
      <SchoolAdverts />
    </div>
  );
};

export default SchoolAdvertSide;
