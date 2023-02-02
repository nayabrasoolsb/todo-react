import "./header.css"

import { Outlet, useNavigate } from "react-router-dom";

import React from "react";

export default function Header() {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <div>Todo app</div>
        <div onClick={()=>navigate("login")}>Home</div>
        <div>Careers</div>
        <div onClick={() => navigate("login")}>Sign in</div>
      </header>
      <Outlet />
    </>
  );
}
