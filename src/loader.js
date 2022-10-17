import React from "react";
import "./forms/css/loader.css";
export const Loader = () => {
  return (
    <div id="loading">
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
