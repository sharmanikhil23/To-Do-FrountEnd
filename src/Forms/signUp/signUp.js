import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Importing Css
//import "./css/signIn.css";

//Importing Other Components
import { Loader } from "../loadingAnimation.js/loading";

//Importing helper functions
import { handlingSignUp } from "./handlingSignUp";

const SignUp = () => {
  let navigate = useNavigate();

  //To handle when the form submit
  const submitForm = async (e) => {
    e.preventDefault();
    setUserData((current) => {
      return { ...current, loading: true };
    });

    await handlingSignUp({ userData }, (error, data) => {
      setUserData((current) => {
        return { ...current, loading: false };
      });

      if (error) {
        setUserData((current) => {
          return {
            ...current,
            error: {
              message: error.message,
              errorValue: !current.error.errorValue,
            },
          };
        });

        setTimeout(() => {
          setUserData((current) => {
            return {
              ...current,
              error: {
                message: error.message,
                errorValue: !current.error.errorValue,
              },
            };
          });
        }, 2000);
      } else {
        localStorage.setItem(
          "User Data",
          JSON.stringify({ data, token: "Bearer " + data.token })
        );
        navigate("/");
      }
    });
  };

  //the state variable which will take care of the email and the password entered by the user
  let data = {
    name: "",
    email: "",
    age: "",
    password: "",
    error: {
      message: "",
      errorValue: false,
    },
    loading: false,
  };
  const [userData, setUserData] = useState(data);

  // This state variable and effect is for the showPassword State Variable
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    let password = document.getElementById("password");
    if (showPassword) {
      password.setAttribute("type", "text");
    } else {
      password.setAttribute("type", "password");
    }
  }, [showPassword]);

  return (
    <div id="action">
      {/* only showing loading when needed */}
      {userData.loading ? <Loader></Loader> : <></>}

      {/* Only showing the error when it does Occur */}
      {userData.error.errorValue ? (
        <div className="errorArea signUpForm-errorArea">
          <h1>{userData.error.message}</h1>
        </div>
      ) : (
        <></>
      )}

      <div className="main-form-area">
        <h2 className="heading">Sign Up</h2>
        <form className="main-form" onSubmit={(e) => submitForm(e)}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full Name"
            className="input"
            value={userData.name}
            onChange={(e) => {
              setUserData((current) => {
                return {
                  ...current,
                  name: e.target.value,
                };
              });
            }}
          ></input>
          <input
            required
            type="text"
            id="email"
            name="email"
            placeholder="E-Mail"
            className="input"
            value={userData.email}
            onChange={(e) => {
              setUserData((current) => {
                return {
                  ...current,
                  email: e.target.value,
                };
              });
            }}
          ></input>

          <input
            required
            type="number"
            id="age"
            name="age"
            placeholder="Age"
            className="input"
            value={userData.age}
            onChange={(e) => {
              setUserData((current) => {
                return {
                  ...current,
                  age: e.target.value,
                };
              });
            }}
          ></input>
          <input
            required
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            className="input"
            onChange={(e) => {
              setUserData((current) => {
                return {
                  ...current,
                  password: e.target.value,
                };
              });
            }}
          ></input>

          <section className="showPassword">
            <input
              type="checkbox"
              id="showPassword"
              name="showPassword"
              value="showPassword"
              onClick={() => setShowPassword((current) => !current)}
            />
            Show Password
          </section>
          <section className="actionButtonArea">
            <button className="button" onClick={(e) => submitForm(e)}>
              Sign Up
            </button>
            <Link className="button" to={"/signIn"}>
              Sign In
            </Link>
          </section>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
