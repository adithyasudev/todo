import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const socket = io('http://localhost:5000');

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const TaskStats = () => {
    const [tasks, setTasks] = useState([]);

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

    const getStatusCounts = () => {
        const counts = { 'Yet to Start': 0, 'In Progress': 0, 'Completed': 0 };
        tasks.forEach(task => {
            counts[task.status]++;
        });
        return counts;
    };

    const data = [
        { name: 'Yet to Start', value: getStatusCounts()['Yet to Start'] },
        { name: 'In Progress', value: getStatusCounts()['In Progress'] },
        { name: 'Completed', value: getStatusCounts()['Completed'] },
    ];

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9' }}>
    <h2 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>Task Statistics</h2>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                cx={200}
                cy={200}
                labelLine={false}
                label
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    </div>
</div>

    );
};

export default TaskStats;
