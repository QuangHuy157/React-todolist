import { createSlice } from "@reduxjs/toolkit";

const getInitialValue = () => {
  const LocaltodoList = window.localStorage.getItem("todoList");
  if (LocaltodoList) {
    return JSON.parse(LocaltodoList);
  }
  window.localStorage.setItem("todoList", []);
  return [];
};

const initialValue = {
  filterStatus: "all",
  todoList: getInitialValue(),
};

export const TodoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
      } else {
        window.localStorage.setItem(
          "todoList",
          JSON.stringify([{ ...action.payload }])
        );
      }
    },
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    updateTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.title = action.payload.title;
            todo.status = action.payload.status;
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = [...todoListArr];
      }
    },
    UpdateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, UpdateFilterStatus } =
  TodoSlice.actions;
export default TodoSlice.reducer;
