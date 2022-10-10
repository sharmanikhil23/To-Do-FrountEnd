import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import image from "./userBasic.jpeg";
import { logOut } from "./requests/logOut";
import { useNavigate } from "react-router-dom";
import { logOutAll } from "./requests/logOutFromAllDevices";
import React from "react";

export const Header = ({
  searching,
  search,
  setSearching,
  getAllNotes,
  stopSearching,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <section className="comman">
        <section className="header">
          <h1>To Do</h1>
          <form className="form" onSubmit={(e) => search(e)}>
            <AiOutlineSearch
              className="form-icon"
              onClick={(e) => search(e)}
            ></AiOutlineSearch>
            <input
              type="text"
              className="form-input"
              placeholder="Search"
              value={searching}
              onChange={async (e) => {
                await setSearching(e.currentTarget.value);
              }}
            ></input>
            <AiOutlineClose
              className="form-icon"
              onClick={(e) => {
                stopSearching(e);
                setSearching("");
              }}
            ></AiOutlineClose>
          </form>

          <div className="userAreaStarting">
            <img src={image} alt="user"></img>
            <div className="userArea-action">
              <div>
                <a
                  onClick={async () => {
                    if ((await logOut()) === true) {
                      localStorage.removeItem("User Data");
                      localStorage.removeItem("allNotes");
                      navigate("/");
                    }
                  }}
                >
                  Log Out
                </a>
                <a
                  onClick={async () => {
                    if ((await logOutAll()) === true) {
                      localStorage.removeItem("User Data");
                      localStorage.removeItem("allNotes");
                      navigate("/");
                    }
                  }}
                >
                  Log Out from All Devices
                </a>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};
