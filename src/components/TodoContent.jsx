import React from "react";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";

const TodoContent = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const sortTodolist = [...todoList];

  sortTodolist.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filterTodoStatus = sortTodolist.filter((todo) => {
    if (filterStatus === "all") {
      return true;
    }

    return todo.status === filterStatus;
  });

  return (
    <div className="content">
      {filterTodoStatus && filterTodoStatus.length > 0
        ? filterTodoStatus.map((todo) => <TodoItem todo={todo} key={todo.id} />)
        : "Không có công việc nào"}
    </div>
  );
};

export default TodoContent;
