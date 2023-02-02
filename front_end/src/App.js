import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Login from "./components/Login";
import Nomatch from "./components/Nomatch";
import Register from "./components/Register";
import TodoList from "./components/TodoList";
import UserHeader from "./components/UserHeader";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/" element={<UserHeader />}>
          <Route path="/" element={<TodoList />} />
          <Route path="/user" element={<TodoList />} />
        </Route>
        <Route path="*" element={<Nomatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
