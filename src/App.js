import React from "react";

import { RouterProvider } from "react-router-dom";
import Router from "./Routes/route";

export const App = () => {
  return <RouterProvider router={Router}></RouterProvider>;
};
