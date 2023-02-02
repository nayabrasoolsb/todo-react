import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
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
    if (userData.password !== userData.confirmPassword) {
      return alert("password fields should be same");
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userData.username,
        password: userData.password,
      }),
    };
    fetch("http://localhost:3004/api/v1/register", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.messege) {
          return alert(data.messege);
        }
        if (data.status === "success") {
          alert("registration successful");
          navigate("/login");
        }
      })
      .catch((e) => console.log(e));
  }
  return (
    <div className="main-login">
      <div>
        <form onSubmit={submitHandler} action="#" method="POST">
          <div>
            <h2>Register</h2>
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
          <div>
            <input
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={changeHandler}
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div style={{ marginTop: "7px", textAlign: "end", fontSize: "14px" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ width: "70px" }}>
              Login
            </Link>
          </div>
          <div>
            <button>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}
