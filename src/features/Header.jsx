import React from "react";

const Header = () => {
  return (
    <div
      style={{ backgroundColor: "ButtonFace", padding: 20 }}
      className="font-bold"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        className="head"
      >
        <h3 style={{ textDecoration: "underline" }}>COVID-19 CASES TRACKER</h3>
        <h4>Today : {new Date().toLocaleDateString()}</h4>
      </div>
    </div>
  );
};

export default Header;
