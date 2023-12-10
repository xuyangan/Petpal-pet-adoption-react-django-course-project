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
import ApplicationViewUpdateSeeker from './pages/ApplicationGetUpdateSeekerPOV';
import ApplicationViewUpdateShelter from './pages/ApplicationGetUpdateShelterPOV';
import ApplicationsDashboardSeeker from './pages/ApplicationListSeekerPOV';
import SeekerProfile from './pages/SeekerProfile';
import ShelterProfile from './pages/ShelterProfile';
import UpdateSeeker from './pages/UpdateSeeker';
import UpdateShelter from './pages/UpdateShelter';
import ShelterList from './pages/ShelterList';
import PetCreationForm from './pages/PetCreationForm/pet_creation_form';
import ApplicationsDashboardShelter from './pages/ApplicationListShelterPOV';
import ApplicationMessages from './pages/ApplicationMessage';
import SearchPage from './pages/SearchPage/search_page';
import Analytics from './pages/Analytics';
import { ShelterSeekerContextProvider } from './contexts/ShelterSeekerContext';
import LayoutLoggedOut from './components/LayoutLoggedOut';
import MorePetListings from './pages/MorePetListings/more_pet_listings';
import NotificationCenter from './pages/NotificationCenter';


function App() {
  const [authToken, setAuthToken] = useState("a");
  const value = { authToken, setAuthToken };

  const [id, setId] = useState("");
  const idValue = { id, setId };


  return (
    <AuthContext.Provider value={value}>
      <IdContext.Provider value={idValue}>
        <ShelterSeekerContextProvider value={{}}>
          <PetListingsContextProvider value={{}}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Landing />} />
                  <Route path="profile/seeker/:username" element={<SeekerProfile />} />
                  <Route path="profile/shelter/:username" element={<ShelterProfile />} />
                  <Route path="profile/update/seeker" element={<UpdateSeeker />} />
                  <Route path="profile/update/shelter" element={<UpdateShelter />} />
                  <Route path="shelters" element={<ShelterList />} />
                  <Route path="applications/:application_id/" element={<ApplicationCreate />} />
                  <Route path="applications/view/:application_id/seeker" element={<ApplicationViewUpdateSeeker />} />
                  <Route path="applications/view/:application_id/shelter" element={<ApplicationViewUpdateShelter />} />
                  <Route path="applications/faq/" element={<FAQ />} />
                  <Route path="applications/dashboard/seeker" element={<ApplicationsDashboardSeeker />} />
                  <Route path="applications/dashboard/shelter" element={<ApplicationsDashboardShelter />} />
                  <Route path="applications/:application_id/messages" element={<ApplicationMessages />} />
                  <Route path="notifications" element={<NotificationCenter />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="shelter_management" element={<ShelterManagement />} />
                  <Route path="pet_listings" element={<PetListings />} />
                  <Route path="pet_listings/information/:petId" element={<PetInformation />} />
                  <Route path="pet_listings/edit/:petId" element={<PetEditForm />} />
                  <Route path="pet_listings/create" element={<PetCreationForm />} />
                  <Route path="pet_listings/search" element={<SearchPage />} />
                  <Route path="pet_listings/:username" element={<MorePetListings />} />
                </Route>


                <Route path="/" element={<LayoutLoggedOut />}>
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="signup/seeker" element={<SignupSeeker />} />
                  <Route path="signup/shelter" element={<SignupShelter />} />
                </Route>

              
              </Routes>
            </BrowserRouter>
          </PetListingsContextProvider>
        </ShelterSeekerContextProvider>
      </IdContext.Provider>
    </AuthContext.Provider>
  )
}

export default App;
