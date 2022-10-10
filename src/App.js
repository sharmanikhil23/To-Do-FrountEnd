import React, { useState, useEffect, Component } from "react";
import { SignIn } from "./forms/signin";
import { MainPage } from "./main/app";
import { SignUp } from "./forms/signUp";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export const App = () => {
  const setDefault = {
    name: "",
    email: "",
    password: "",
    age: "",
    error: {
      message: "",
      errorValue: false,
    },
  };
  const [data, setData] = useState(setDefault);

  const setDataToDefault = () => {
    setData(setDefault);
  };
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
  }, [data.error.errorValue == true]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" exact element={<MainPage></MainPage>} />
        <Route
          path="/signup"
          exact
          element={
            <SignUp
              {...data}
              setData={setData}
              setDataToDefault={setDataToDefault}
            ></SignUp>
          }
        />
        <Route
          path="/"
          exact
          element={
            <SignIn
              {...data}
              exact
              setData={setData}
              setDataToDefault={setDataToDefault}
            ></SignIn>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
