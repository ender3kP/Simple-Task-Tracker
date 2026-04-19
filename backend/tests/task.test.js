const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    isCompleted: { type: Boolean, default: false }
});
const CloudTask = mongoose.model('CloudTask', taskSchema);

test('NewTask_ShouldNotBeCompleted', () => {
    const task = new CloudTask({ title: "Przetestować bezpiecznik" });

    expect(task.isCompleted).toBe(false);
});