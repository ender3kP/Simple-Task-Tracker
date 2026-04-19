import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = () => {
    api.get('/api/tasks')
      .then(res => { setTasks(res.data); setError(null); })
      .catch(err => setError("Błąd pobierania danych: " + err.message));
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) {
      setError("Tytuł zadania nie może być pusty!");
      return;
    }
    api.post('/api/tasks', { title: newTaskTitle })
      .then(() => { fetchTasks(); setNewTaskTitle(""); setError(null); })
      .catch(err => {
        setError("Błąd backendu (status " + err.response?.status + "): " + err.response?.data?.message);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard Chmurowy - Menedżer Zadań</h1>
      {error && <p style={{ color: 'green', fontWeight: 'bold' }}>{error}</p>}
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          value={newTaskTitle} 
          onChange={e => setNewTaskTitle(e.target.value)} 
          placeholder="Nazwa nowego zadania..." 
        />
        <button onClick={addTask}>Dodaj zadanie</button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}