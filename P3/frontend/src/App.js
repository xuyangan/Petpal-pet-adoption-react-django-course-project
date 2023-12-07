import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import { IdContext } from './contexts/IdContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SignupSeeker from './pages/SignupSeeker';
import SignupShelter from './pages/SignupShelter';
import ApplicationForm from './pages/ApplicationForm';
import SeekerProfile from './pages/SeekerProfile';
import ShelterProfile from './pages/ShelterProfile';
import UpdateSeeker from './pages/UpdateSeeker';
import UpdateShelter from './pages/UpdateShelter';
import ShelterList from './pages/ShelterList';

function App() {
  const [authToken, setAuthToken] = useState("");
  const value = { authToken, setAuthToken };

  const [id, setId] = useState("");
  const idValue = { id, setId };

  console.log("check auth", authToken);

  return (
    <AuthContext.Provider value={value}>
      <IdContext.Provider value={idValue}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Landing />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="signup/seeker" element={<SignupSeeker />} />
              <Route path="signup/shelter" element={<SignupShelter />} />
              <Route path="applications" element={<ApplicationForm />} />
              <Route path="profile/seeker/:username" element={<SeekerProfile />} />
              <Route path="profile/shelter/:username" element={<ShelterProfile />} />
              <Route path="profile/update/seeker" element={<UpdateSeeker />} />
              <Route path="profile/update/shelter" element={<UpdateShelter />} />
              <Route path="shelters" element={<ShelterList />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </IdContext.Provider>
    </AuthContext.Provider>
  )
}

export default App;
