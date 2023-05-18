import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import SignIn from "../Forms/signIn/signIn";
import SignUp from "../Forms/signUp/signUp";
import { Main, checkingUserData } from "../mainArea/index";

import fetchingAllNotes from "../mainArea/requests/fetchingAllNotes";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    loader: async function () {
      let userData = checkingUserData();
      if (userData !== null || userData !== undefined) {
        let allNotes = await fetchingAllNotes(userData.token);
        if (!allNotes) {
          return redirect("/signin");
        } else {
          return allNotes;
        }
      }
      return redirect("/signin");
    },
    errorElement: <SignIn></SignIn>,
    caseSensitive: false,
  },
  {
    path: "/signin",
    element: <SignIn></SignIn>,
    caseSensitive: false,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
    caseSensitive: false,
  },
  {
    path: "/*",
    element: <SignIn></SignIn>,
    caseSensitive: false,
  },
]);

export default Router;
