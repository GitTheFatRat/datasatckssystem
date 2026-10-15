import { useState } from 'react';
import { Star, MoreHorizontal, CheckCircle2, Circle, Plus } from 'lucide-react';
import { initialTasks } from '../../services/mockData';
import './ToDo.css';

export default function ToDo() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showAdd, setShowAdd] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const toggleComplete = (id) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const toggleStar = (id) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, starred: !t.starred } : t));
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    setTasks((prev) => [...prev, { id: `task-${Date.now()}`, title: newTaskTitle, completed: false, starred: false }]);
    setNewTaskTitle('');
    setShowAdd(false);
  };

  return (
    <div className="page-body">
      <div className="todo-header">
        <h1 className="page-header-title" style={{ marginBottom: 0 }}>
          {showAdd ? 'Add New To-Do' : 'To-Do List'}
        </h1>
        {!showAdd ? (
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            <Plus size={16} /> Add New Task
          </button>
        ) : (
          <button className="btn-primary" onClick={addTask}>Save</button>
        )}
      </div>

      {showAdd && (
        <div className="todo-add-input-wrapper">
          <input
            className="input-field todo-add-input"
            placeholder="Write Your task name here"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            autoFocus
          />
        </div>
      )}

      <div className="todo-list">
        {tasks.map((task) => (
          <div key={task.id} className={`todo-item ${task.completed ? 'todo-item--done' : ''}`}>
            <button className="todo-check" onClick={() => toggleComplete(task.id)}>
              {task.completed ? (
                <CheckCircle2 size={20} className="todo-check-icon--done" />
              ) : (
                <Circle size={20} className="todo-check-icon" />
              )}
            </button>
            <span className={`todo-title ${task.completed ? 'todo-title--done' : ''}`}>
              {task.title}
            </span>
            <button className="todo-star" onClick={() => toggleStar(task.id)}>
              <Star size={18} fill={task.starred ? '#FEC53D' : 'none'} stroke={task.starred ? '#FEC53D' : 'var(--text-muted)'} />
            </button>
            <button className="todo-more">
              <MoreHorizontal size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
