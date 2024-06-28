import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  deleteUserTask,
  getUserTasks,
  updateTaskAction,
} from "../features/task/taskSlice";

function Home() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });

  const [submitError, setSubmitError] = useState(false);
  const [updatingID, setUpdatingId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    dispatch(getUserTasks());
  }, [dispatch]);

  function handleInputs(e) {
    const { name, value } = e.target;
    setTaskData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function onUpateChange(e) {
    const { name, value } = e.target;
    setUpdatedTask((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    if (taskData.title.trim() !== "" && taskData.description.trim() !== "") {
      dispatch(createTask(taskData));
      setTaskData({
        title: "",
        description: "",
      });
      setSubmitError(false);
    } else {
      setSubmitError(true);
    }
  }

  return (
    <div>
      <h1>User tasks</h1>
      {submitError && (
        <p
          style={{
            color: "red",
            fontWeight: "bold",
          }}
        >
          Please enter valid task
        </p>
      )}
      {tasks.map((task) => (
        <div key={task._id}>
          {updatingID === task._id ? (
            <div>
              <input
                name="title"
                onChange={onUpateChange}
                value={updatedTask.title}
              />
              <textarea
                name="description"
                onChange={onUpateChange}
                value={updatedTask.description}
              ></textarea>
              <button
                onClick={() => {
                  setUpdatingId(null);
                  dispatch(updateTaskAction(updatedTask));
                }}
              >
                Save
              </button>
              <button onClick={() => setUpdatingId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <h1>{task.title}</h1>
              <p>{task.description}</p>
              <button onClick={() => dispatch(deleteUserTask(task._id))}>
                Delete Task
              </button>
              <button
                onClick={() => {
                  setUpdatingId(task._id);
                  setUpdatedTask({
                    _id: task._id,
                    title: task.title,
                    description: task.description,
                  });
                }}
              >
                Update Task
              </button>
              
            </div>
          )}
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
