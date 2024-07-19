import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    const [token, setToken] = useState(null);

    if (!token) {
        return (
            <div>
                <Login setToken={setToken} />
                <Register />
            </div>
        );
    }

    return <Home />;
}

export default App;
