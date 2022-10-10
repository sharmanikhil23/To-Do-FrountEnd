import React from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { upDatingData } from "./requests/upDatingData";
import { addingNewData } from "./requests/addingNewData";
import { fetchingAllNotes } from "./requests/fetchingAllData";

export const Adding = ({
  allNotes,
  addNewNotes,
  setAllNotes,
  inputForm,
  setInputForm,
}) => {
  const addElement = async (e) => {
    e.preventDefault();
    if (inputForm.currentInput !== "") {
      const newNote = {
        description: inputForm.currentInput,
        completed: false,
      };
      const addingData = await addingNewData(newNote).then((value) =>
        value === true ? true : false
      );

      if (addingData) {
        fetchingAllNotes().then((value) => {
          setAllNotes(value);
        });

        setInputForm((current) => {
          const data = { ...current, currentInput: "" };
          return data;
        });
      }
    }
  };

  const takingFocusAway = () => {
    setInputForm((current) => {
      const result = {
        ...current,
        currentInput: "",
        isEditing: false,
        indexEditingElement: -1,
      };

      return result;
    });
  };
  const updateValue = (e) => {
    e.preventDefault();
    if (
      upDatingData(
        { description: inputForm.currentInput },
        allNotes[inputForm.indexEditingElement]._id
      )
    ) {
      setAllNotes((current) => {
        let result = current.map((value, index) => {
          if (index === inputForm.indexEditingElement) {
            value = { ...value, description: inputForm.currentInput };
          }
          return value;
        });
        return result;
      });
      takingFocusAway();
    }
  };

  return (
    <section className="adding-notes">
      <form
        className="adding-notes-form"
        onSubmit={(e) => {
          if (inputForm.isEditing === true) {
            updateValue(e);
          } else {
            addElement(e);
          }
        }}
      >
        <AiOutlinePlus className="adding-notes-form-icon"></AiOutlinePlus>
        <input
          type="text"
          placeholder="Add a task"
          className="adding-notes-form-input"
          value={inputForm.currentInput}
          onChange={(e) =>
            setInputForm((current) => {
              const data = { ...current, currentInput: e.target.value };
              return data;
            })
          }
        ></input>
        <div className="adding-notes-form-action-area">
          <button
            className="adding-notes-form-action-area-button"
            onClick={(e) => {
              if (inputForm.isEditing === true) {
                updateValue(e);
              } else {
                addElement(e);
              }
            }}
          >
            {inputForm.isEditing === true ? "UpDate" : "Add"}
          </button>
          <AiOutlineClose
            className="adding-notes-form-icon  adding-notes-form-icon-cross"
            onClick={() => takingFocusAway()}
          ></AiOutlineClose>
        </div>
      </form>
    </section>
  );
};
