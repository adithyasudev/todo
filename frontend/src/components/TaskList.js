import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        socket.on('initialTasks', (initialTasks) => {
            setTasks(initialTasks);
        });

        socket.on('updateTasks', (updatedTasks) => {
            setTasks(updatedTasks);
        });

        return () => {
            socket.off('initialTasks');
            socket.off('updateTasks');
        };
    }, []);

    const addTask = () => {
        const task = { id: Date.now().toString(), text: newTask, status: 'Yet to Start' };
        socket.emit('addTask', task);
        setNewTask('');
    };

    const updateTask = (task) => {
        const updatedTask = { ...task, status: task.status === 'Yet to Start' ? 'In Progress' : 'Completed' };
        socket.emit('updateTask', updatedTask);
    };

    const deleteTask = (taskId) => {
        socket.emit('deleteTask', taskId);
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9' }}>
    <h1 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>Task List</h1>
    <input 
        type="text" 
        value={newTask} 
        onChange={(e) => setNewTask(e.target.value)} 
        placeholder="New Task"
        style={{ width: 'calc(100% - 22px)', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
    />
    <button 
        onClick={addTask}
        style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
    >
        Add Task
    </button>
    <ul style={{ listStyleType: 'none', padding: '0', marginTop: '20px' }}>
        {tasks.map(task => (
            <li key={task.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ddd' }}>
                <span style={{ flex: '1', color: '#333' }}>
                    {task.text} - <strong>{task.status}</strong>
                </span>
                <button 
                    onClick={() => updateTask(task)}
                    style={{ marginLeft: '10px', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: task.status === 'Yet to Start' ? '#28a745' : '#ffc107', color: '#fff' }}
                >
                    {task.status === 'Yet to Start' ? 'Start' : 'Complete'}
                </button>
                <button 
                    onClick={() => deleteTask(task.id)}
                    style={{ marginLeft: '10px', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#dc3545', color: '#fff' }}
                >
                    Delete
                </button>
            </li>
        ))}
    </ul>
</div>

    );
};

export default TaskList;
