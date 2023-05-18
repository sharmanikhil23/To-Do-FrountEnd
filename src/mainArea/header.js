import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

// importing some helper functions
import { logOut as userLogOut } from "./requests/logOut";
import { logOutAll } from "./requests/logOutFromAllDevices";

import image from "./userBasic.jpeg";

//importing Css
import "./css/header.css";

export const Header = ({ notes, setUserNotes }) => {
  const [formInput, setFormInput] = useState("");
  const navigator = useNavigate();

  const logOut = async (e) => {
    e.preventDefault();
    if (await userLogOut()) {
      localStorage.removeItem("User Data");
      navigator("/signin");
    } else {
      localStorage.removeItem("User Data");
      navigator("/signin");
    }
  };

  const logOutFromAll = async (e) => {
    e.preventDefault();
    if (await logOutAll()) {
      localStorage.removeItem("User Data");
      navigator("/signin");
    } else {
      localStorage.removeItem("User Data");
      navigator("/signin");
    }
  };

  const search = (e) => {
    e.preventDefault();
    if (!sessionStorage.getItem("userNotes")) {
      sessionStorage.setItem("userNotes", JSON.stringify(notes));
    } else {
      notes = JSON.parse(sessionStorage.getItem("userNotes"));
    }

    let result = notes.filter((elm) => {
      if (elm.description.toLowerCase().includes(formInput.toLowerCase())) {
        return elm;
      }
    });

    setUserNotes(result);
  };

  const removeFocus = (e) => {
    e.preventDefault();
    if (!sessionStorage.getItem("userNotes")) {
    } else {
      setUserNotes(JSON.parse(sessionStorage.getItem("userNotes")));
      sessionStorage.removeItem("userNotes");
    }
    setFormInput("");
  };
  return (
    <div id="headingArea">
      <div className="comman-width">
        <div id="headerElementAlign" className="headerElementAlignAbove600">
          <section id="heading">
            <h1>To Do</h1>
          </section>
          <section id="heading-search">
            <form onSubmit={(e) => search(e)}>
              <AiOutlineSearch
                className="header-form-icons"
                onClick={(e) => search(e)}
              ></AiOutlineSearch>
              <input
                type="text"
                placeholder="Search"
                size={35}
                value={formInput}
                onChange={(e) => setFormInput(e.target.value)}
              ></input>
              <AiOutlineClose
                className="header-form-icons"
                onClick={(e) => removeFocus(e)}
              ></AiOutlineClose>
            </form>
          </section>
          <div className="userAreaStarting">
            <img src={image} alt="user"></img>
            <div className="userArea-action">
              <div>
                <a onClick={(e) => logOut(e)}>Log Out</a>
                <a onClick={(e) => logOutFromAll(e)}>
                  Log Out from All Devices
                </a>
              </div>
            </div>
          </div>
        </div>

        <div id="headerElementAlign" className="headerElementAlignbelow600">
          <section id="heading">
            <h1>To Do</h1>
            <div className="userAreaStarting">
              <img src={image} alt="user"></img>
              <div className="userArea-action">
                <div>
                  <a onClick={(e) => logOut(e)}> Log Out</a>
                  <a onClick={(e) => logOutFromAll(e)}>
                    Log Out from All Devices
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section id="heading-search">
            <form onSubmit={(e) => search(e)}>
              <AiOutlineSearch
                className="header-form-icons"
                onClick={(e) => search(e)}
              ></AiOutlineSearch>
              <input
                type="text"
                placeholder="Search"
                size={35}
                value={formInput}
                onChange={(e) => setFormInput(e.target.value)}
              ></input>
              <AiOutlineClose
                className="header-form-icons"
                onClick={(e) => removeFocus(e)}
              ></AiOutlineClose>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};
