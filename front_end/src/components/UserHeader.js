import "./header.css";

import { Outlet, useNavigate } from "react-router-dom";

import React from "react";

export default function UserHeader() {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <div>Todo app</div>
        <div onClick={() => navigate("/user")}>Home</div>
        <div>{localStorage.getItem("username")} </div>
        <div
          onClick={() => {
            navigate("/login");
            localStorage.removeItem("token");
          }}>
          Log out
        </div>
      </header>
      <Outlet />
    </>
  );
}
