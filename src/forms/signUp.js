import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/signIn.css";
const { REACT_APP_MY_URL } = process.env;

export const SignUp = (args) => {
  const { name, age, email, password, error, setData } = args;

  const navigate = useNavigate();
  const showPassword = useRef(null);
  const [showPasswordValue, setShowPasswordValue] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData((current) => {
        return {
          ...current,
          error: {
            errorValue: false,
            message: "",
          },
        };
      });
    }, 4000);
  }, [error]);

  useEffect(() => {
    if (showPasswordValue) {
      showPassword.current.setAttribute("type", "text");
    } else {
      showPassword.current.setAttribute("type", "password");
    }
  }, [showPasswordValue]);

  let success = false;
  const savingData = (e) => {
    const url = `${REACT_APP_MY_URL}/users`;
    e.preventDefault();
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        name,
        age,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          success = true;
        } else {
          setData((current) => {
            return {
              ...current,
              error: {
                errorValue: !error.errorValue,
                message:
                  "Either the email already exist or you are using the password as password ",
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
          navigate("/main");
        }
      });
  };
  return (
    <>
      <div className="startingWholePage">
        <div className="wholePage">
          {error.errorValue && <div className="error"> {error.message}</div>}
          <div className="form">
            <h1 className="form-heading">Sign Up</h1>
            <form onSubmit={(e) => savingData(e)} className="main-form">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) =>
                  setData((current) => {
                    return { ...current, name: e.target.value };
                  })
                }
                className="form-input input"
                required
              ></input>
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
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) =>
                  setData((current) => {
                    return { ...current, age: e.target.value };
                  })
                }
                className="form-input input"
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
                <button onSubmit={(e) => savingData(e)} className="form-button">
                  Sign Up
                </button>
                <button onClick={() => navigate("/")} className="form-button">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
