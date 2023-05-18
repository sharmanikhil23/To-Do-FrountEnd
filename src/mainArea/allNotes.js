import React from "react";
import { useNavigate } from "react-router-dom";

// importing helper Functions
import { deletingTask } from "./requests/deleteUserNote";

// Icons
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineDone } from "react-icons/md";

//CSS
import "./css/allNotes.css";

export const AllNotes = (props) => {
  return (
    <div id="notesArea">
      <div className="comman-width">
        <div id="notes-area-element-align">
          <Notes {...props}></Notes>
        </div>
      </div>
    </div>
  );
};

const Notes = ({ notes, setUserNotes, elementOnFocus }) => {
  const navigator = useNavigate();
  const deleteNote = async (e, data, ind) => {
    e.preventDefault();
    setUserNotes((data) => {
      let result = data.filter((current, index) => {
        if (index !== ind) {
          return current;
        }
      });

      return result;
    });
    if ((await deletingTask(data)) == null) {
      navigator("/signin");
    }
  };

  const completeNote = async (e, data, ind) => {
    e.preventDefault();

    data = { ...data, completed: true };

    setUserNotes((current) => {
      let result = current.map((element, index) => {
        if (index === ind) {
          element = { ...element, completed: true };
          return element;
        }
        return element;
      });
      return result;
    });

    setTimeout(() => {
      deleteNote(e, data, ind);
    }, 3000);
  };

  return (
    <>
      {notes.map((data, index) => {
        const { _id, completed, description } = data;
        return (
          <div key={_id} className="note">
            <section className="note-action-buttonArea">
              <MdOutlineDone
                className="note-action-button"
                onClick={(e) => completeNote(e, data, index)}
              ></MdOutlineDone>
              <RiDeleteBin6Line
                className="note-action-button"
                onClick={(e) => deleteNote(e, data, index)}
              ></RiDeleteBin6Line>
            </section>
            <p
              className={`note-description ${completed ? "complete" : ""}`}
              onClick={(e) => elementOnFocus(e, { ...data, index })}
            >
              {description}
            </p>
          </div>
        );
      })}
    </>
  );
};
