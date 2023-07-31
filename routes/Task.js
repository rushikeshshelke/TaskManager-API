const express = require("express");
const validator = require("express-validator");

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/Task");

router = express.Router();

router.get("/", getAllTasks);

router.get("/:tId", getTaskById);

router.post(
  "/",
  [
    validator.check("name").not().isEmpty(),
    validator.check("completed").not().isBoolean(),
  ],
  createTask
);

router.patch(
  "/:tId",
  [validator.check("completed").not().isBoolean()],
  updateTask
);

router.delete("/:tId", deleteTask);

module.exports = router;
