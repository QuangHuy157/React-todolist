import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../redux/slice/TodoSlice";
import Modal from "./Modal";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  useEffect(() => {
    if (todo.status === "complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({ ...todo, status: checked ? "incomplete" : "complete" })
    );
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    console.log(todo.id);
  };

  const handleUpdate = () => {
    setUpdateModal(true);
  };
  return (
    <>
      <div className="content-item">
        <div
          className={todo.status === "complete" ? "text-complete" : ""}
          onClick={handleCheck}
        >
          <p>{todo.title}</p>
          <p>{todo.time}</p>
        </div>
        <div className="action">
          <button onClick={handleUpdate}>Sửa</button>
          <button onClick={handleDelete}>Xóa</button>
        </div>
      </div>
      <Modal
        type="update"
        todo={todo}
        OpenModal={updateModal}
        setOpenModal={setUpdateModal}
      />
    </>
  );
};

export default TodoItem;
