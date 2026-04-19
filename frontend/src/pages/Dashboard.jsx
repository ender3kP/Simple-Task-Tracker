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

  const deleteTask = async (id) => {
    try {
        // Używamy Twojego skonfigurowanego 'api' do usunięcia
        await api.delete(`/api/tasks/${id}`);
        // Odświeżamy listę, żeby zadanie zniknęło z ekranu!
        fetchTasks(); 
    } catch (error) {
        console.error("Błąd podczas usuwania:", error);
        setError("Nie udało się usunąć zadania.");
    }
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
      {/* Mała poprawka: zmieniłem kolor tekstu błędu na czerwony z zielonego */}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>} 
      
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
          <li key={task.id} style={{ marginBottom: '10px' }}>
            {task.title}
            {/* Przycisk usunięcia jest teraz wewnątrz listy i odnosi się do task.id */}
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
                Usuń
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}