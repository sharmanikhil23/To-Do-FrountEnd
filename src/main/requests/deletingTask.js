import React from "react";
import { useNavigate } from "react-router-dom";
const { REACT_APP_MY_URL } = process.env;

export const deletingTask = async (taskId) => {
  const token = JSON.parse(localStorage.getItem("User Data")).token;
  if (token === null) {
    return false;
  } else {
    let url = `${REACT_APP_MY_URL}/task/${taskId}`;
    let method = "DELETE";
    const response = await fetch(url, {
      method,
      headers: new Headers({
        Authorization: token,
        "Content-Type": "application/json",
      }),
    });
    if (response.status === 200) {
      return true;
    } else if (response.status === 401) {
      const navigate = useNavigate();
      navigate("/");
    } else {
      return false;
    }
  }
};
