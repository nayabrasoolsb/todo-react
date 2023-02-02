import "./login.css";

import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function Login() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  function changeHandler(e) {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }
  async function submitHandler(e) {
    e.preventDefault();
    if (userData.password.length < 8) {
      return alert("password length cannot be less than 8");
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    fetch("https://todo-app-by-nayab-rasool-server.onrender.com/api/v1/login", options)
      .then((res) => res.json())
      .then((data) => {
        if(data.messege){
          return alert('invalid credentials')
        }
        if(data.status==="success"){
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.user.username)
          navigate("/user")
        }
      })
      .catch((e) => console.log(e));
  }
  return (
    <div className="main-login">
      <div>
        <form onSubmit={submitHandler} action="#" method="POST">
          <div>
            <h2>Login</h2>
          </div>
          <div>
            <input
              name="username"
              value={userData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <input
              name="password"
              value={userData.password}
              onChange={changeHandler}
              type="password"
              placeholder="Password"
            />
          </div>
          <div style={{ marginTop: "7px", textAlign: "end", fontSize: "14px" }}>
            Dont have an account?
            <Link to="/register" style={{ width: "70px" }}>
              Register
            </Link>
          </div>
          <div>
            <button>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
