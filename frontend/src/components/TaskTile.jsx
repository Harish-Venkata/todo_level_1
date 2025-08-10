import React from "react";
import checkedBlue from "../assets/blue-checked.svg";
import AlarmClock from "../assets/alarm-clock.svg";
import Edit from "../assets/edit.svg";
import Delete from "../assets/delete.svg";
import moment from "moment";
import { useState } from "react";
import { useCallback } from "react";
import { DeleteTask } from "./ui/DeleteTask";

export const TaskTile = ({
  task,
  onClick,
  fetchAllTasks,
  setActiveTask,
  showEditTaskScreen,
}) => {

const[showDeleteTaskPopup,setShowDeleteTaskPopup]=useState(false);


const handleEditTask=(e)=>{
  e.stopPropagation();
  setActiveTask(task);
  showEditTaskScreen();
}

const handleDeleteTask=useCallback((e)=>{
    e.stopPropagation();
setShowDeleteTaskPopup(true);
},[]);

const closeDeleteTaskPopup=useCallback(()=>{
setShowDeleteTaskPopup(false)
},[])


  return (
    <>
      <div className="task-tile-container cursor-pointer" onClick={onClick}>
        <span className="task-icon-wrapper">
          <img src={checkedBlue} className="task-icon" alt="Task icon" />
        </span>

        <div className="task-text-wrapper">
          <p className="task-primary-text">{task.title}</p>
          <p className="task-secondary-text">{task.description}</p>
        </div>
        <div className="action-items-container">
          {task.due_date && (
            <div className="flex date-container">
              <img src={AlarmClock} alt="clcok-icon" />
              <p className="date-text"> {moment(task.due_date).format("DD MMM YYYY")}</p>
            </div>
          )}
          <div className="edit-container cursor-pointer">
            <img src={Edit} alt="edit task icon" 
            onClick={handleEditTask}
            />
          </div>

          <div className="delete-container cursor-pointer"
          onClick={handleDeleteTask}>
            <img src={Delete} alt="Delete task icon" />
          </div>
        </div>
      </div>
      <DeleteTask isOpen={showDeleteTaskPopup} onClose={closeDeleteTaskPopup}
      task={task}
      fetchAllTasks={fetchAllTasks}
      />
    </>
  );
};
