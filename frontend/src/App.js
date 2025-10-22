import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddTodo from "./pages/AddTodo";
import TodoList from "./pages/TodoList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./styles.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddTodo />} />
        <Route path="/add" element={<AddTodo />} />
        <Route path="/list" element={<TodoList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/edit/:id" element={<AddTodo />} />
      </Routes>
       <ToastContainer
        position="top-right"
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </Router>
  );
}

export default App;
