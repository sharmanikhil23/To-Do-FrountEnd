import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

// importing other components
import { Header } from "./header";
import { MainArea } from "./addingArea";
import { AllNotes } from "./allNotes";
import { Footer } from "./footer";
import { MovingUp } from "./movingUp";

//importing css
import "./css/main.css";

export const checkingUserData = () => {
  const userData = JSON.parse(localStorage.getItem("User Data"));
  if (!userData || userData === undefined) {
    return null;
  } else {
    return userData;
  }
};

export const Main = () => {
  const userData = useLoaderData();

  const [userNotes, setUserNotes] = useState(userData);

  const [updateElm, setUpdateElm] = useState(null);
  const [update, setUpdate] = useState(false);
  const [formInput, setFormInput] = useState("");

  const elementOnFocus = (e, data) => {
    e.preventDefault();
    setUpdateElm(data);
    setUpdate(true);
    setFormInput(data.description);
  };

  return (
    <div id="main-action">
      <Header notes={userNotes} setUserNotes={setUserNotes}></Header>
      <MainArea
        setUserNotes={setUserNotes}
        updateElm={updateElm}
        update={update}
        setUpdate={setUpdate}
        formInput={formInput}
        setFormInput={setFormInput}
        setUpdateElm={setUpdateElm}
      ></MainArea>
      {/* <MovingUp></MovingUp> */}
      <AllNotes
        notes={userNotes}
        setUserNotes={setUserNotes}
        elementOnFocus={elementOnFocus}
      ></AllNotes>
      <Footer></Footer>
    </div>
  );
};
