import React from "react";
import { useNavigate } from "react-router-dom";

// importing all the requests
import { addingNewData } from "./requests/addingNewNote";
import { deletingTask } from "./requests/deleteUserNote";
import { upDatingData } from "./requests/upDateNote";
import fetchingAllNotes from "./requests/fetchingAllNotes";

//importing icons
import { RxCross1, RxPlus, RxUpdate, RxTrash } from "react-icons/rx";

// importing css
import "./css/addingArea.css";

const HeadingBeforeAddingArea = () => {
  return (
    <div id="addingAreaHeading">
      <div className="comman-width">
        <section id="addingAreaHeading">
          <h1>My Tasks</h1>
        </section>
      </div>
    </div>
  );
};

export const MainArea = ({
  setUserNotes,
  updateElm,
  update,
  setUpdate,
  setFormInput,
  formInput,
  setUpdateElm,
}) => {
  const navigator = useNavigate();
  const updateData = async (e) => {
    e.preventDefault();
    const temp = formInput;
    setUserNotes((data) => {
      let result = data.map((current, index) => {
        if (index === updateElm.index) {
          current = { ...current, description: temp };
        }
        return current;
      });
      return result;
    });
    clearForm(e);
    if ((await upDatingData({ description: temp }, updateElm._id)) === null) {
      navigator("/signin");
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    if (formInput.length === 0) {
      return;
    } else {
      const newNote = {
        description: formInput,
        completed: false,
      };

      setUserNotes((current) => {
        return [...current, newNote];
      });
      clearForm(e);
      const addingData = await addingNewData(newNote);
      if (addingData.status === 201) {
        const token = JSON.parse(localStorage.getItem("User Data")).token;
        const data = await fetchingAllNotes(token);
        if (data != null) {
          setUserNotes(data);
        }
      } else {
        navigator("/signin");
      }
    }
  };

  const clearForm = (e) => {
    e.preventDefault();
    if (update) {
      setUpdate(false);
      setFormInput("");
      setUpdateElm(null);
    } else {
      setFormInput("");
    }
  };

  const deleteNote = async (e) => {
    e.preventDefault();

    setUserNotes((data) => {
      return data.filter((current, index) => {
        if (index !== updateElm.index) {
          return current;
        }
      });
    });

    let temp = updateElm;
    clearForm(e);
    if ((await deletingTask(temp)) == null) {
      navigator("/signin");
    }
  };

  return (
    <>
      <HeadingBeforeAddingArea></HeadingBeforeAddingArea>
      <div id="addingArea">
        <div className="comman-width">
          <section id="addingAreaForm">
            <form
              onSubmit={(e) => {
                update === false ? submitData(e) : updateData(e);
              }}
            >
              {update === false ? (
                <RxPlus
                  className="addingAreaForm-icons"
                  onClick={(e) => submitData(e)}
                ></RxPlus>
              ) : (
                <RxUpdate
                  className="addingAreaForm-icons"
                  onClick={(e) => updateData(e)}
                ></RxUpdate>
              )}
              <input
                placeholder="Add a task"
                id="addingAreaFormData"
                value={formInput}
                onChange={(e) => {
                  setFormInput((current) => {
                    return e.target.value;
                  });
                }}
              ></input>
              {update && (
                <RxTrash
                  className="addingAreaForm-icons"
                  onClick={(e) => deleteNote(e)}
                ></RxTrash>
              )}
              <RxCross1
                className="addingAreaForm-icons"
                onClick={(e) => clearForm(e)}
              ></RxCross1>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};
