import Task from "../models/taskModels.js";

const newTask = async (req, res) => {
  try {
    //1.extract data from the body

    const { title, description, due_date } = req.body;

    //2.validation on the incoming data
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description not found" });
    }

    //3.create document based on the schema
    const newTask = await Task.create({ title, description, due_date });
    //Sucess Response
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({
      success: false,
      message: "failed to Create task",
    });
  }
};

const getTasks = async (req, res) => {
  //Get all the tasks from mongodb
  try {
    const tasks = await Task.find({});
    res.status(200).json({
      success: true,
      tasks,
      message: "fetched all the tasks successfully",
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({
      success: false,
      message: "failed to fetch task",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    //1.get the id from params
    const { id } = req.params;
    //2.get the data to update from body
    const { title, description, due_date } = req.body;
    //3.validation on body and id
    if (!id) {
      return res.status(400).json({ message: "task id required" });
    }
    //4.find the document according to the id
    // const task = await Task.findById(id);
    //5.update the document

    // if (title) task.title = title;
    // if (description) task.description = description;
    // if (due_date) task.due_date = due_date;
    // if (!due_date) task.due_date = null;

    // //6.save the document
    // const updatedTask = await task.save();
    //ORR
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        due_date: due_date || null,
      },
      { returnDocument: "after" }
    );

    //7.send the response
    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("failed to update the task", error);

    res.status(400).json({
      success: false,
      message: "failed to update the task",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    //1.get the id from params
    const { id } = req.params;
    //2.validation on body and id
    if (!id) {
      return res.status(400).json({ message: "task id required" });
    }
    //3.to delete the task
    const DeletedTask = await Task.findByIdAndDelete(id);

    //4.send the response
    res.status(200).json({
      success: true,
      message: "Task deleted Successfully",
      task: DeletedTask,
    });
  } catch (error) {
    console.error("Error in deleting task", error);

    res.status(400).json({
      success: false,
      message: "Task deleted unsuccessfully",
    });
  }
};

export { newTask, getTasks, updateTask, deleteTask };
