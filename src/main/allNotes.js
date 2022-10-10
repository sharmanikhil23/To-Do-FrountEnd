import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineDone } from "react-icons/md";

export const AllNotes = ({
  allNotes,
  deleteTheNote,
  completed,
  focusingElement,
  setEditing,
}) => {
  return (
    <>
      <section className="all-notes-area">
        <div className="all-notes">
          {allNotes.map((value, index) => {
            return (
              <div key={index} className="note">
                <div className="note-action-button-area">
                  <MdOutlineDone
                    className="note-action-button"
                    onClick={(e) => {
                      completed(index, e);
                    }}
                  ></MdOutlineDone>
                  <RiDeleteBin6Line
                    className="note-action-button"
                    onClick={(e) => deleteTheNote(index, value._id)}
                  ></RiDeleteBin6Line>
                </div>
                {value.completed !== true ? (
                  <p
                    className="notes-text"
                    ref={focusingElement}
                    onClick={() => setEditing(index)}
                  >
                    {value.description}
                  </p>
                ) : (
                  <p
                    className="notes-text note-completed"
                    ref={focusingElement}
                    onClick={() => setEditing(index)}
                  >
                    {value.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
