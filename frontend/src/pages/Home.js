import React from 'react';
import TaskList from '../components/TaskList';
import TaskStats from '../components/TaskStats';

const Home = () => {
    return (
        <div>
            <TaskList />
            <TaskStats />
        </div>
    );
};

export default Home;
