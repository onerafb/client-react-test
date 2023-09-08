import axios from "axios";
import React, { useContext, useState } from "react";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import Todoitems from "../components/Todoitems";
import { Navigate } from "react-router-dom";
import "../styles/todo.css";
const Home = () => {
  const [title, settitle] = useState("");
  const [description, setdesc] = useState("");
  const [loading, setloading] = useState(false);
  const [tasks, settask] = useState([]);
  const [refresh, setrefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setrefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setrefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const { data } = await axios.post(
        `${server}/task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      settitle("");
      setdesc("");
      toast.success(data.message);
      setloading(false);
      setrefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setloading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        settask(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container-home">
      <form onSubmit={submitHandler} className="home-form">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className="todo-input"
        />
        <br />

        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setdesc(e.target.value)}
          className="todo-input"
        />

        <br />
        <button disabled={loading} type="submit" className="todo-bt">
          Create Task
        </button>
      </form>

      <div className="todo-container">
        {tasks.map((i) => (
          <div key={i._id}>
            <Todoitems
              title={i.title}
              description={i.description}
              isCompleted={i.isCompleted}
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
              id={i._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
