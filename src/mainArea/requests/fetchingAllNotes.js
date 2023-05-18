import axios from "axios";

const { REACT_APP_BACK_END_URL } = process.env;

const fetchingAllNotes = async (token) => {
  return await axios({
    method: "GET",
    url: `${REACT_APP_BACK_END_URL}/tasks`,
    headers: {
      Authorization: token,
    },
    timeout: 5000,
  })
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      if (error.toJSON().message === "Network Error") {
        alert("no internet connection");
      }
      return null;
    });
};

export default fetchingAllNotes;
