const Task = require('../models/Task');

exports.getAllTasks = async () => await Task.find();
exports.getTaskById = async (id) => await Task.findById(id);
exports.createTask = async (data) => await Task.create(data);
exports.updateTask = async (id, data) => await Task.findByIdAndUpdate(id, data, { new: true });
exports.deleteTask = async (id) => await Task.findByIdAndDelete(id);