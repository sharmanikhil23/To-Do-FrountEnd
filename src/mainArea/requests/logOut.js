const { REACT_APP_BACK_END_URL } = process.env;

export const logOut = async () => {
  const url = `${REACT_APP_BACK_END_URL}/user/logout`;
  const result = await fetch(url, {
    method: "POST",
    headers: new Headers({
      Authorization: JSON.parse(localStorage.getItem("User Data")).token,
      "Content-Type": "application/json",
    }),
  });
  if (result.status === 200) {
    return true;
  } else {
    return false;
  }
};
