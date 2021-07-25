import React from "react";
import "./comps_styles.css";
import Search from "./Search";

const Header = ({ value, setValue }) => {
  return (
    <div className="header">
      <div className="left">
        <h2 className="header_title" onClick={() => window.scroll(0, 0)}>
          XTHA
        </h2>
      </div>
      <div className="right">
        <Search value={value} setValue={setValue} />
      </div>
    </div>
  );
};

export default Header;
