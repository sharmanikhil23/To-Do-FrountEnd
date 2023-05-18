import axios from "axios";
const { REACT_APP_BACK_END_URL } = process.env;

export const handlingSignIn = ({ email, password }, callback) => {
  axios({
    method: "POST",
    url: `${REACT_APP_BACK_END_URL}/user/login`,
    data: {
      email,
      password,
    },

    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      return callback(undefined, { ...data.data });
    })
    .catch((error) => {
      console.log(error);
      if (error.toJSON().message === "Network Error") {
        alert("no internet connection");
      }
      return callback(
        {
          message: "Invalid credientials ",
        },
        undefined
      );
    });
};
