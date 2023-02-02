import "./todo-list.css";

import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function TodoList() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const [todo, setTodo] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [list, setList] = useState([]);
  function changeHandler(e) {
    setTodo(e.target.value);
  }
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    };
    async function fetchTodo() {
      await fetch("http://localhost:3004/api/v1/todo/fetch", options)
        .then((res) => res.json())
        .then((data) => setList(data.todoList))
        .catch((e) => console.log(e));
    }
    fetchTodo();
  }, [refresh]);
  async function addingToList() {
    if (!todo) return;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        activity: todo,
        status: "pending",
        timeTaken: "",
      }),
    };
    await fetch("http://localhost:3004/api/v1/todo/create", options)
      .then((res) => res.json())
      .then((data) => data)
      .catch((e) => console.log(e));
    setRefresh(!refresh);
    setTodo("");
  }
  return (
    <div className="main-todo">
      <div>
        <h3>Todo List</h3>
        <h4 style={{ textAlign: "center" }}>History</h4>
      </div>
      <div className="sec-div">
        <div className="input-div">
          <input value={todo} placeholder="todo" onChange={changeHandler} />
          <button onClick={addingToList}>Add to List</button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Activity</th>
                <th>Status</th>
                <th>
                  Time Takeen
                  <br />
                  (Hr:Min:Sec)
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!list.length ? (
                <tr>
                  <td>No data available</td>
                </tr>
              ) : (
                <>
                  {list.map((obj, i) => {
                    return (
                      <tr key={i}>
                        <td>{obj.activity}</td>
                        <td>{obj.status}</td>
                        <td>{obj.timeTaken} </td>
                        <td>
                          <button>start</button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
