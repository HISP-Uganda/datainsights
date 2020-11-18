import React from "react";

export const Cross = () => (
  <>
    <div
      id="side-nav__menu-button__bar1"
      style={{
        width: "1.7vw",
        height: "5px",
        backgroundColor: "rgb(34, 94, 140)",
        margin: "6px 0px",
        transition: "all 0.5s ease 0s",
        transform: "rotate(-45deg) translate(-9px, 6px)",
      }}
    />
    <div
      id="side-nav__menu-button__bar2"
      style={{
        width: "1.7vw",
        height: "5px",
        backgroundColor: "rgb(34, 94, 140)",
        margin: "6px 0px",
        transition: "all 0.5s ease 0s",
        opacity: "0",
      }}
    />
    <div
      id="side-nav__menu-button__bar3"
      style={{
        width: "1.7vw",
        height: "5px",
        backgroundColor: "rgb(34, 94, 140)",
        margin: "6px 0px",
        transition: "all 0.5s ease 0s",
        transform: "rotate(45deg) translate(-8px, -8px)",
      }}
    />
  </>
);
