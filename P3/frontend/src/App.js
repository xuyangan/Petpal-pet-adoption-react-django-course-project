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
import PetListings from './pages/PetListings/pet_listings';
import { PetListingsContext } from './contexts/PetListingsContext';
import { PetListingsContextProvider } from './contexts/PetListingsContext';
import PetInformation from './pages/PetInformation/pet_information';
import PetGallery from './components/CompoundComponents/PetGallery/pet_gallery';
import ShelterManagement from './pages/ShelterManagement/shelter_management';
import PetEditForm from './pages/PetEditingForm/pet_editing_form';
import ApplicationCreate from './pages/ApplicationCreate';
import FAQ from './pages/FAQ';
import SeekerProfile from './pages/SeekerProfile';
import ShelterProfile from './pages/ShelterProfile';
import UpdateSeeker from './pages/UpdateSeeker';
import UpdateShelter from './pages/UpdateShelter';
import ShelterList from './pages/ShelterList';
import PetCreationForm from './pages/PetCreationForm/pet_creation_form';
import SearchPage from './pages/SearchPage/search_page';

function App() {
  const [authToken, setAuthToken] = useState("");
  const value = { authToken, setAuthToken };

  const [id, setId] = useState("");
  const idValue = { id, setId };

  console.log("check auth", authToken);

  return (
    <AuthContext.Provider value={value}>
      <IdContext.Provider value={idValue}>
        <PetListingsContextProvider value={value}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Landing />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="signup/seeker" element={<SignupSeeker />} />
                <Route path="signup/shelter" element={<SignupShelter />} />
                <Route path="applications/:id/" element={<ApplicationCreate />} />
                <Route path="profile/seeker/:username" element={<SeekerProfile />} />
                <Route path="profile/shelter/:username" element={<ShelterProfile />} />
                <Route path="profile/update/seeker" element={<UpdateSeeker />} />
                <Route path="profile/update/shelter" element={<UpdateShelter />} />
                <Route path="shelters" element={<ShelterList />} />
                <Route path="applications/faq/" element={<FAQ />} />
              </Route>

              <Route path="/pet_listings/" element={<Layout />}>
                <Route index element={<SearchPage />} />
                <Route path="create/" element={<PetCreationForm />} />
                <Route path="list/" element={<PetListings />} />
                <Route path=":petId/" element={<PetInformation />} />
                <Route path=":petId/edit/" element={<PetEditForm />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PetListingsContextProvider>
      </IdContext.Provider>
    </AuthContext.Provider>
  )
}

export default App;
