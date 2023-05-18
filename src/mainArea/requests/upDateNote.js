import axios from "axios";

const { REACT_APP_BACK_END_URL } = process.env;

export const upDatingData = async (data, task_id) => {
  const token = JSON.parse(localStorage.getItem("User Data")).token;

  let url = `${REACT_APP_BACK_END_URL}/task?id=${task_id}`;

  return await axios({
    method: "PATCH",
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
      console.log(error);
      return null;
    });
};
