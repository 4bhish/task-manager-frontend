import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  deleteUserTask,
  getUserTasks,
} from "../features/task/taskSlice";

function Home() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    dispatch(getUserTasks());
  }, [dispatch]);

  function handleInputs(e) {
    const { name, value } = e.target;
    setTaskData(prevState => {
      return {
        ...prevState,
        [name]:value
      }
    })
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    if (taskData.title.trim() !== "" && taskData.description.trim() !== "") {
      dispatch(createTask(taskData));
      setTaskData({
        title:'',
        description:''
      })
    }
  }
  return (
    <div>
      <h1>User tasks</h1>
      {tasks.map((task) => (
        <div key={task._id}>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <button onClick={() => dispatch(deleteUserTask(task._id))}>
            Delete Task
          </button>
        </div>
      ))}
      <form onSubmit={onSubmitHandler}>
        <input
          name="title"
          value={taskData.title}
          type="text"
          placeholder="Enter a title of the task"
          onChange={handleInputs}
        />
        <textarea
          value={taskData.description}
          name="description"
          placeholder="Enter a task description"
          onChange={handleInputs}
        ></textarea>
        <button type="submit">Submit Task</button>
      </form>
    </div>
  );
}

export default Home;
