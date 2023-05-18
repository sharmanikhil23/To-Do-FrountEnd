import axios from "axios";

const { REACT_APP_BACK_END_URL } = process.env;

export const deletingTask = async (data) => {
  let taskId = data._id;
  const token = JSON.parse(localStorage.getItem("User Data")).token;

  if (token === null) {
    return false;
  } else {
    let url = `${REACT_APP_BACK_END_URL}/task/${taskId}`;

    return await axios({
      method: "DELETE",
      url: url,
      headers: {
        Authorization: token,
      },
      timeout: 5000,
    })
      .then((data) => {
        return { status: data.status, data: data.data };
      })
      .catch((error) => {
        if (error.toJSON().message === "Network Error") {
          alert("no internet connection");
        }
        return null;
      });
  }
};
