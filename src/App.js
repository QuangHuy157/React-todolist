import "./App.css";
import Header from "./components/Headers";
import { ToastContainer } from "react-toastify";
import TodoContent from "./components/TodoContent";

function App() {
  return (
    <>
      <div className="App">
        <div className="container">
          <Header />

         <TodoContent/>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
