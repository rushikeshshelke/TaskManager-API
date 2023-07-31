const Task = require("../models/Task");

const HttpError = require("../utils/http-error");

const getAllTasks = async (req, res, next) => {
  let tasks;
  try {
    tasks = await Task.find({}, "-__v");
  } catch (err) {
    const error = new HttpError(
      `Something went wrong, Could not able to fetch tasks : ${err}`,
      500
    );
    return next(error);
  }
  res.status(200).json({ success: true, tasks: tasks });
};

const getTaskById = async (req, res, next) => {
  const taskId = req.params.tId;
  let task;
  try {
    task = await Task.findById(taskId, "-__v");
  } catch (err) {
    const error = new HttpError(
      `Something went wrong, Could not able to fetch task : ${err}`,
      500
    );
    return next(error);
  }

  if (!task) {
    return next(new HttpError("Task not found", 404));
  }

  res.status(200).json({ success: true, task: task });
};

const createTask = async (req, res, next) => {
  const { name, completed } = req.body;

  const createdTask = new Task({
    name,
    completed,
  });

  console.log(createdTask);
  let existingTask;

  try {
    existingTask = await Task.findOne({ name: name });
  } catch (err) {
    const error = new HttpError(
      `Something went wrong, Could not create task try again! : ${err}`,
      404
    );
    return next(error);
  }

  if (existingTask) {
    return next(new HttpError("Task already exists", 409));
  }

  try {
    await createdTask.save();
  } catch (err) {
    const error = new HttpError(
      `Something went wrong, Could not create task try again! : ${err}`,
      500
    );
    return next(error);
  }
  res.status(201).json({ task: createdTask });
};

const updateTask = async (req, res, next) => {
  const taskId = req.params.tId;
  let task;
  try {
    task = await Task.findById(taskId);
  } catch (err) {
    const error = new HttpError(
      `Something went wrong, Could not able to fetch task : ${err}`,
      500
    );
    return next(error);
  }

  if (!task) {
    return next(new HttpError("Task not found", 404));
  }
  const { completed } = req.body;

  task.completed = completed;

  try {
    await task.save();
  } catch (err) {
    const error = new HttpError(
      `Something went wrong, Could not update task try again! : ${err}`,
      500
    );
    return next(error);
  }
  res.status(200).json({ success: true, task: task });
};

const deleteTask = async (req, res, next) => {
  const taskId = req.params.tId;
  let task;
  try {
    task = await Task.findById(taskId);
  } catch (err) {
    const error = new HttpError(
      `Something went wrong, Could not able to fetch task : ${err}`,
      500
    );
    return next(error);
  }

  if (!task) {
    return next(new HttpError("Task not found", 404));
  }

  try {
    await task.deleteOne();
  } catch (err) {
    const error = new HttpError(
      `Something went wrong, Could not able to delete task : ${err}`,
      500
    );
    return next(error);
  }
  res.status(204).json({ success: true });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
