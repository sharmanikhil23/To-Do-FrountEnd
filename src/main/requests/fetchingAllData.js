const { REACT_APP_MY_URL } = process.env;
export const fetchingAllNotes = async () => {
  let url = `${REACT_APP_MY_URL}/tasks`;
  let method = "GET";
  const result = await fetch(url, {
    method,
    headers: new Headers({
      Authorization: JSON.parse(localStorage.getItem("User Data")).token,
      "Content-Type": "application/json",
    }),
  });

  if (result.status !== 200) {
    console.log("called");
    return null;
  }
  const data = await result.json();

  return data;
};
