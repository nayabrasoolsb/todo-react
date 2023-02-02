import React from "react";
import { useNavigate } from "react-router-dom";

export default function Nomatch() {
  const navigate = useNavigate();
  return (
    <div>
      Page not found plase go back
      <button onClick={() => navigate(-1)}>{`< back`} </button>
    </div>
  );
}
