import React from "react";
const { REACT_APP_MY_URL } = process.env;

export const addingNewData = async (data) => {
  const userId = JSON.parse(localStorage.getItem("User Data")).user._id;

  let url = `${REACT_APP_MY_URL}/tasks/${userId}`;
  let method = "POST";
  const response = await fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: new Headers({
      Authorization: JSON.parse(localStorage.getItem("User Data")).token,
      "Content-Type": "application/json",
    }),
  });

  if (response.status === 201) {
    return true;
  } else {
    return false;
  }
};
