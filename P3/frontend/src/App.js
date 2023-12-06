import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SignupSeeker from './pages/SignupSeeker';
import SignupShelter from './pages/SignupShelter';
import ApplicationForm from './pages/ApplicationForm';

function App() {
  const [authToken, setAuthToken] = useState("");
  const value = { authToken, setAuthToken };

  console.log("check auth", authToken);

  return (
    <AuthContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="signup/seeker" element={<SignupSeeker />} />
            <Route path="signup/shelter" element={<SignupShelter />} />
            <Route path="applications" element={<ApplicationForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
