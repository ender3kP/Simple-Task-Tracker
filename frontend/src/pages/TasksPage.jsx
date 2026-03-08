import { useState, useEffect } from 'react';
import api from '../services/api';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get('/tasks')
      .then(response => setTasks(response.data))
      .catch(err => {
        console.error("API error, using mock data", err);
        setError(true);
        setTasks([
          { id: 1, title: "Zrobić Artefakt 3", completed: true },
          { id: 2, title: "Nauczyć się Dockera", completed: false }
        ]);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Moja Lista Zadań</h1>
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>Użyto danych testowych (Brak backendu na porcie 8081)</p>}
      
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none', marginBottom: '8px' }}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}