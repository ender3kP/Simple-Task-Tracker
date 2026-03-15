const taskService = require('../services/taskService');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getTask = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ message: "Nie znaleziono zadania" });
    res.status(200).json(task);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.createTask = async (req, res) => {
  try {
    if (!req.body.title) return res.status(400).json({ message: "Tytuł zadania jest wymagany!" });
    const newTask = await taskService.createTask(req.body);
    res.status(201).json(newTask);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await taskService.updateTask(req.params.id, req.body);
    if (!updatedTask) return res.status(404).json({ message: "Nie znaleziono zadania" });
    res.status(200).json(updatedTask);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await taskService.deleteTask(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: "Nie znaleziono zadania" });
    res.status(204).send();
  } catch (error) { res.status(500).json({ message: error.message }); }
};