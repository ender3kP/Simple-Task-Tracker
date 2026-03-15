const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskController = require('./controllers/taskController');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8081;
const DB_URL = process.env.MONGO_URL; 

mongoose.connect(DB_URL)
  .then(() => console.log('✅ Połączono z bazą MongoDB z kontenera!'))
  .catch(err => console.error('❌ Błąd połączenia z bazą:', err));

app.get('/api/tasks', taskController.getTasks);
app.get('/api/tasks/:id', taskController.getTask);
app.post('/api/tasks', taskController.createTask);
app.put('/api/tasks/:id', taskController.updateTask);
app.delete('/api/tasks/:id', taskController.deleteTask);

app.listen(PORT, () => console.log(`🚀 Backend działa na porcie ${PORT}`));