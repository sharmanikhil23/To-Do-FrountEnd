const { REACT_APP_MY_URL } = process.env;
export const upDatingData = async (data, task_id) => {
  let url = `${REACT_APP_MY_URL}/task?id=${task_id}`;
  let method = "PATCH";
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(data),
      headers: new Headers({
        Authorization: JSON.parse(localStorage.getItem("User Data")).token,
        "Content-Type": "application/json",
      }),
    });

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};
