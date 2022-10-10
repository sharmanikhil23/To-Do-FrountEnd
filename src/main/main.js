import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import React from "react";

export const Main = () => {
  return (
    <section className="before-main">
      <div className="main">
        <h2 className="main-heading">My Tasks</h2>
        <button className="main-button">
          <AiOutlineArrowUp></AiOutlineArrowUp>
          <AiOutlineArrowDown></AiOutlineArrowDown>
          Sort
        </button>
      </div>
    </section>
  );
};
