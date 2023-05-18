const { REACT_APP_BACK_END_URL } = process.env;

export const logOutAll = async () => {
  const url = `${REACT_APP_BACK_END_URL}/user/logoutAll`;
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
