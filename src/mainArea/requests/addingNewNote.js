import axios from "axios";

const { REACT_APP_BACK_END_URL } = process.env;

export const addingNewData = async (data) => {
  const userData = JSON.parse(localStorage.getItem("User Data"));

  if (userData === undefined) {
    return { status: 404, data: false };
  }

  const userId = userData.data.user._id;
  const token = userData.token;

  let url = `${REACT_APP_BACK_END_URL}/tasks/${userId}`;

  return await axios({
    method: "POST",
    url: url,
    headers: {
      Authorization: token,
    },
    data: data,
    timeout: 5000,
  })
    .then((data) => {
      return { status: data.status, data: data.data };
    })
    .catch((error) => {
      if (error.toJSON().message === "Network Error") {
        alert("no internet connection");
      }
      return { status: 404, data: false };
    });
};
