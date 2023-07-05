import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../redux/slice/TodoSlice";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const Modal = ({ type, OpenModal, todo, setOpenModal }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");

  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle("");
      setStatus("incomplete");
    }
  }, [type, todo, OpenModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && status) {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuidv4(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast("Thêm công việc thành công");
        setOpenModal(false);
      }
      if (type === "update") {
        if (todo.title !== title || todo.status !== status) {
          dispatch(
            updateTodo({
              ...todo,
              title,
              status,
            })
          );
        } else {
          console.log("có lỗi");
          return;
        }
        setOpenModal(false);
      }
    }
  };

  return (
    <>
      {OpenModal && (
        <div className="modal">
          <div className="box">
            <button className="close" onClick={() => setOpenModal(false)}>
              X
            </button>
            <h1>{type === "add" ? "add" : "update"} todo</h1>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">Completed</option>
              </select>
              <button>{type === "add" ? "add" : "update"}</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
