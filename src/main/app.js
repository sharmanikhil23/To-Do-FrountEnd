import React from "react";
import { useState, useEffect, useRef } from "react";
import { Header } from "./header";
import { Main } from "./main";
import { Adding } from "./addingArea";
import { AllNotes } from "./allNotes";
import { fetchingAllNotes } from "./requests/fetchingAllData";
import { upDatingData } from "./requests/upDatingData";
import { deletingTask } from "./requests/deletingTask";
import { useNavigate } from "react-router-dom";
import { addingNewData } from "./requests/addingNewData";
import "./css/index.css";
export const MainPage = () => {
  const navigate = useNavigate();

  const focusingElement = useRef(null);

  const [inputForm, setInputForm] = useState({
    currentInput: "",
    isEditing: false,
    indexEditingElement: -1,
  });

  let [allNotes, setAllNotes] = useState([]);

  // const getAllNotes = JSON.parse(localStorage.getItem("tempaAllNotes"));
  const [searching, setSearching] = useState("");

  const getAllNotes = (e) => {
    e.preventDefault();
    fetchingAllNotes().then((value) => {
      setAllNotes(value);
    });
  };

  const stopSearching = (e) => {
    e.preventDefault();
    setAllNotes(JSON.parse(sessionStorage.getItem("tempValue")));
    sessionStorage.clear();
  };
  const search = async (e) => {
    e.preventDefault();
    const dataInSession = JSON.parse(sessionStorage.getItem("tempValue"));

    if (dataInSession == null) {
      sessionStorage.setItem("tempValue", JSON.stringify(allNotes));
    } else {
      setAllNotes("User Data", JSON.parse(sessionStorage.getItem("tempValue")));
    }

    if (searching !== "") {
      setAllNotes((current) => {
        let result = current.filter((value) => {
          let tempValue = value.description.toLowerCase();
          if (tempValue.includes(searching.toLowerCase())) {
            return value;
          }
        });
        sessionStorage.setItem("tempValue", JSON.stringify(current));
        return result !== null ? result : [];
      });
    }
  };

  const setEditing = (id) => {
    setInputForm((current) => {
      return {
        ...current,
        currentInput: allNotes[id].description,
        isEditing: true,
        indexEditingElement: id,
      };
    });
  };
  const addNewNotes = (data) => {
    setAllNotes((current) => [...current, data]);
  };

  const deleteTheNote = (targetIndex, taskId) => {
    if (deletingTask(taskId)) {
      setAllNotes((current) => {
        let result = current.filter((current, index) => {
          if (targetIndex !== index) {
            return current;
          } else {
            return null;
          }
        });
        return result;
      });
    }
  };

  const completed = async (targetIndex, e) => {
    e.preventDefault();
    if (
      upDatingData(
        { completed: !allNotes[targetIndex].completed },
        allNotes[targetIndex]._id
      )
    ) {
      await setAllNotes((current) => {
        let result = current.map((element, index) => {
          if (index === targetIndex) {
            element = { ...element, completed: !element.completed };
            return element;
          } else {
            return element;
          }
        });

        return result;
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("allNotes", JSON.stringify(allNotes));
  }, [allNotes]);

  useEffect(() => {
    if (localStorage.getItem("User Data") === null) {
      navigate("/");
    } else {
      fetchingAllNotes().then((value) => {
        setAllNotes(value);
      });
    }

    document.addEventListener("reload", () => {
      navigate("/");
    });
  }, []);

  return (
    <>
      <Header
        searching={searching}
        search={search}
        setSearching={setSearching}
        getAllNotes={getAllNotes}
        stopSearching={stopSearching}
      ></Header>
      <Main></Main>
      <Adding
        allNotes={allNotes}
        addNewNotes={addNewNotes}
        setAllNotes={setAllNotes}
        inputForm={inputForm}
        setInputForm={setInputForm}
      ></Adding>
      <AllNotes
        allNotes={allNotes}
        deleteTheNote={deleteTheNote}
        completed={completed}
        focusingElement={focusingElement}
        setEditing={setEditing}
      ></AllNotes>
    </>
  );
};
