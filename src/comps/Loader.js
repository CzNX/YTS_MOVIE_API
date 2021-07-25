import React from "react";
import load from "../assets/spinner.gif";
const Loader = () => {
  return (
    <div className="loader">
      <img style={{ width: "100px" }} src={load} alt="err" />
    </div>
  );
};

export default Loader;
