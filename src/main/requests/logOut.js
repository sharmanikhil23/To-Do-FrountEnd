import React from "react";
const { REACT_APP_MY_URL } = process.env;

export const logOut = async () => {
  const url = `${REACT_APP_MY_URL}/user/logout`;
  const result = await fetch(url, {
    method: "POST",
    headers: new Headers({
      Authorization: JSON.parse(localStorage.getItem("User Data")).token,
      "Content-Type": "application/json",
    }),
  });
  console.log(result.status);
  if (result.status === 200) {
    return true;
  } else {
    return false;
  }
};

//user/logout
