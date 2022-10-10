import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/signIn.css";
const { REACT_APP_MY_URL } = process.env;

export const SignIn = (args) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("User Data") == null) {
      return;
    }
    // this is just to check if the user is already logged in the system then why to
    fetch(`${REACT_APP_MY_URL}/testingconnection`, {
      method: "POST",
      headers: new Headers({
        Authorization: JSON.parse(localStorage.getItem("User Data")).token,
        "Content-Type": "application/json",
      }),
    }).then((response) => {
      if (response.status === 200) {
        setDataToDefault();
        navigate("/main");
      }
    });
  }, []);
  const { email, password, error, setData, setDataToDefault } = args;

  const showPassword = useRef(null);
  const [showPasswordValue, setShowPasswordValue] = useState(false);

  let success = false;
  useEffect(() => {
    if (showPasswordValue) {
      showPassword.current.setAttribute("type", "text");
    } else {
      showPassword.current.setAttribute("type", "password");
    }
  }, [showPasswordValue]);

  const fetchingData = (e) => {
    e.preventDefault();
    fetch(`${REACT_APP_MY_URL}/user/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          success = true;
        } else {
          setData((current) => {
            return {
              ...current,
              error: {
                errorValue: !error.errorValue,
                message: "Invalid credientials ",
              },
            };
          });
        }
        return response.json();
      })
      .then((data) => {
        if (success) {
          localStorage.setItem(
            "User Data",
            JSON.stringify({ ...data, token: "Bearer " + data.token })
          );
          setDataToDefault();
          navigate("/main");
        }
      });
  };

  return (
    <div className="startingWholePage">
      <div className="wholePage">
        {error.errorValue && <div className="error"> {error.message}</div>}
        <div className="form">
          <h1 className="form-heading">Sign In</h1>
          <form onSubmit={(e) => fetchingData(e)} className="main-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setData((current) => {
                  return { ...current, email: e.target.value };
                })
              }
              className="form-input input"
              required
            ></input>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setData((current) => {
                  return { ...current, password: e.target.value };
                })
              }
              ref={showPassword}
              className="form-input input"
              required
            ></input>

            <div className="show-password">
              <input
                type="checkbox"
                value={showPasswordValue}
                onClick={(e) => {
                  setShowPasswordValue((current) => !current);
                }}
              />
              <label>Show Password</label>
            </div>

            <div className="form-input form-button-area">
              <button onSubmit={(e) => fetchingData(e)} className="form-button">
                Log In
              </button>
              <button
                onClick={() => {
                  setDataToDefault();
                  navigate("/signup");
                }}
                className="form-button"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
