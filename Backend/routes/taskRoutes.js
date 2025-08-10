import express from "express";

import {
  getTasks,
  newTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/task", newTask);
router.get("/tasks", getTasks);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

export default router;
