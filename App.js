import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './firebase-config';
import { signOut } from 'firebase/auth';
import LoginPage from './LoginPage';
import StudentsPage from './StudentsPage';

const App = () => {
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/';
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <nav>
          <button onClick={() => window.location.href = '/students'}>Students Page</button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
        <div style={{ marginLeft: '200px', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/students" element={<StudentsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
