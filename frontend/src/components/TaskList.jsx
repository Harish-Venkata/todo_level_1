import React from "react";
import folderImg from "../assets/folder-white.svg";
import { TaskTile } from "./TaskTile";
import { useCallback } from "react";
let tasks = [
  {
    id: 1,
    title: "RCB Victory parade",
    description: "Preparing for 2026",
    due_date: "05 june 2026",
  },
  {
    id: 2,
    title: "CSK Victory parade",
    description: "Preparing for 2026",
    due_date: "05 june 2026",
  },
  {
    id: 3,
    title: "MI Victory parade",
    description: "Preparing for 2026",
    due_date: "05 june 2026",
  },
];
export const TaskList = ({
  tasks,
  setActiveTask,
  fetchAllTasks,
  showCreateTaskScreen,
  showViewTaskScreen,
  showEditTaskScreen,
}) => {

    const viewTask=useCallback((task)=>{
 setActiveTask(task);
      showViewTaskScreen()
    },[setActiveTask,showCreateTaskScreen])

  return (
  
    <div className="task-list-screen content-section">
      <div className="content-section-container">
        <div className="task-list-header-main">
          <p className="task-heading">🔥 Task</p>
          <button className="add-task-btn cursor-pointer"
          onClick={showCreateTaskScreen}
          >
            <img src={folderImg} alt="add task icon" />
            Add New Task
          </button>
        </div>

        {/*Task List  */}
        <div className="task-list-container">
          {tasks.map((task) => (
            <TaskTile key={task._id +"-task-tile"} 
            onClick={()=>viewTask(task)}
            task={task} 
            fetchAllTasks={fetchAllTasks}
            setActiveTask={setActiveTask}
            showEditTaskScreen={showEditTaskScreen}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
