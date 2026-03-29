const Task = require('../models/Task');

const mapToDTO = (task) => ({
  id: task._id,
  title: task.title,
  completed: task.completed
});

exports.getAllTasks = async () => {
  const tasks = await Task.find();
  return tasks.map(mapToDTO); 
};

exports.getTaskById = async (id) => {
  const task = await Task.findById(id);
  return task ? mapToDTO(task) : null; 
};

exports.createTask = async (data) => {
  const newTask = await Task.create(data);
  return mapToDTO(newTask);
};

exports.updateTask = async (id, data) => {
  const updatedTask = await Task.findByIdAndUpdate(id, data, { new: true });
  return updatedTask ? mapToDTO(updatedTask) : null;
};

exports.deleteTask = async (id) => {
  const deletedTask = await Task.findByIdAndDelete(id);
  return deletedTask ? mapToDTO(deletedTask) : null;
};