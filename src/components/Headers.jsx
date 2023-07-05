import React, { useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { UpdateFilterStatus } from "../redux/slice/TodoSlice";

const Header = () => {
  const [OpenModal, setOpenModal] = useState(false);
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const dispatch = useDispatch();

  const handleChangeFilterStatus = (e) => {
    dispatch(UpdateFilterStatus(e.target.value));
  };

  return (
    <header>
      <button onClick={() => setOpenModal(true)}>Add</button>
      <select value={filterStatus} onChange={handleChangeFilterStatus}>
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Completed</option>
      </select>
      <Modal type="add" OpenModal={OpenModal} setOpenModal={setOpenModal} />
    </header>
  );
};

export default Header;
