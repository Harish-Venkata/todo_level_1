import React, { useEffect, useState, useCallback } from "react";
import { NoTask } from "./NoTask";
import { TaskList } from "./TaskList";
import { CreateTask } from "./CreateTask";
import { ViewTask } from "./ViewTask";
import { EditTask } from "./EditTask";
import { Loading } from "./ui/Loading";
import fetchTaskAPI from "../components/api/fetchTask";

export const TaskMain = () => {
  const [currComponent, setCurrComponent] = useState("createTask");
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState([]);

  const showNoTaskScreen = useCallback(function () {
    setCurrComponent("noTask");
  }, []);
  const showCreateTaskScreen = useCallback(function () {
    setCurrComponent("createTask");
  }, []);
  const showTaskListScreen = useCallback(function () {
    setCurrComponent("taskList");
  }, []);
  const showEditTaskScreen = useCallback(function () {
    setCurrComponent("editTask");
  }, []);
  const showViewTaskScreen = useCallback(function () {
    setCurrComponent("viewTask");
  }, []);

  const handleResponse = useCallback(function (responseData) {
    const extractedTasks = responseData.tasks;
    setTasks(extractedTasks);
    if (extractedTasks.length) {
      showTaskListScreen();
    } else {
      showNoTaskScreen();
    }
  }, []);
  const handleError = useCallback(function (errorMsg) {
    console.error(errorMsg);
  }, []);

  const fetchAllTasks = useCallback(function () {
    fetchTaskAPI(handleResponse, handleError);
  }, []);
  // inital effect
  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);
  return (
    <>
      {currComponent === "loading" && <Loading />}
      <div className="container-div">
        {currComponent === "noTask" && (
          <NoTask showCreateTaskScreen={showCreateTaskScreen} />
        )}

        {currComponent === "taskList" && (
          <TaskList
            tasks={tasks}
            setActiveTask={setActiveTask}
            fetchAllTasks={fetchAllTasks}
            showCreateTaskScreen={showCreateTaskScreen}
            showViewTaskScreen={showViewTaskScreen}
            showEditTaskScreen={showEditTaskScreen}
          />
        )}

        {currComponent === "createTask" && (
          <CreateTask
            fetchAllTasks={fetchAllTasks}
            showTaskListScreen={showTaskListScreen}
            showNoTaskScreen={showNoTaskScreen}
            tasks={tasks}
          />
        )}

        {currComponent === "viewTask" && (
          <ViewTask
            task={activeTask}
            showTaskListScreen={showTaskListScreen}
            fetchAllTasks={fetchAllTasks}
            setActiveTask={setActiveTask}
            showEditTaskScreen={showEditTaskScreen}
          />
        )}

        {currComponent === "editTask" && (
          <EditTask
            showTaskListScreen={showTaskListScreen}
            task={activeTask}
            fetchAllTasks={fetchAllTasks}
          />
        )}
      </div>
    </>
  );
};
