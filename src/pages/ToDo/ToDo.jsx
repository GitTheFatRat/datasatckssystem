import { useState } from 'react';
import { Star, CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';
import { initialTasks } from '../../services/mockData';
import './ToDo.css';

export default function ToDo() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showAdd, setShowAdd] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState('task-4'); // Default select matching Dark 20

  const toggleComplete = (id, e) => {
    e.stopPropagation();
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const toggleStar = (id, e) => {
    e.stopPropagation();
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, starred: !t.starred } : t));
  };

  const deleteTask = (id, e) => {
    e.stopPropagation();
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (selectedTaskId === id) setSelectedTaskId(null);
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    const created = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      completed: false,
      starred: false,
    };
    setTasks((prev) => [created, ...prev]);
    setSelectedTaskId(created.id);
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
            placeholder="Write your task name here..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            autoFocus
          />
        </div>
      )}

      <div className="todo-list">
        {tasks.map((task) => {
          const isSelected = selectedTaskId === task.id;
          return (
            <div
              key={task.id}
              className={`todo-item ${task.completed ? 'todo-item--done' : ''} ${isSelected ? 'todo-item--selected' : ''}`}
              onClick={() => setSelectedTaskId(task.id)}
            >
              <button className="todo-check" onClick={(e) => toggleComplete(task.id, e)}>
                {task.completed ? (
                  <CheckCircle2 size={20} className={isSelected ? 'todo-check-icon--selected' : 'todo-check-icon--done'} />
                ) : (
                  <Circle size={20} className={isSelected ? 'todo-check-icon--selected' : 'todo-check-icon'} />
                )}
              </button>
              <span className={`todo-title ${task.completed ? 'todo-title--done' : ''} ${isSelected ? 'todo-title--selected' : ''}`}>
                {task.title}
              </span>
              <button className="todo-star" onClick={(e) => toggleStar(task.id, e)}>
                <Star
                  size={18}
                  fill={task.starred ? '#FEC53D' : 'none'}
                  stroke={task.starred ? '#FEC53D' : (isSelected ? '#fff' : 'var(--text-muted)')}
                />
              </button>
              <button
                className="todo-delete-btn"
                onClick={(e) => deleteTask(task.id, e)}
                title="Delete task"
              >
                <Trash2 size={18} />
              </button>
            </div>
          );
        })}

        {tasks.length === 0 && (
          <div style={{ padding: '36px', textAlign: 'center', color: 'var(--text-muted)' }}>
            All tasks completed! Add a new task above.
          </div>
        )}
      </div>
    </div>
  );
}
