import axios from "axios";
const { REACT_APP_BACK_END_URL } = process.env;

export const handlingSignUp = (userData, callback) => {
  const { name, email, age, password } = userData;

  const url = `${REACT_APP_BACK_END_URL}/users`;
  axios({
    method: "POST",
    url: `${REACT_APP_BACK_END_URL}/user/login`,
    data: {
      email,
      password,
      name,
      age,
    },
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      return callback(undefined, { ...data.data });
    })
    .catch((error) => {
      return callback(
        {
          message:
            "Either the email already exist or you are using the password as password ",
        },
        undefined
      );
    });
};
