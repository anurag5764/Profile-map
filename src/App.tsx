import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';
import Map from './components/Map';
import ProfileCard from './components/ProfileCard';
import SearchBar from './components/SearchBar';
import AdminPanel from './components/AdminPanel';
import DetailedProfile from './components/DetailedProfile';
import FilterPanel from './components/FilterPanel';
import { useProfiles } from './context/ProfileContext';
import { Shield } from 'lucide-react';

function MainContent() {
  const { profiles, selectedProfile, setSelectedProfile, isAdmin, setIsAdmin } = useProfiles();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Profile Map</h1>
            <div className="flex space-x-4">
              <SearchBar />
              <FilterPanel />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                isAdmin ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              <Shield size={18} className="mr-2" />
              {isAdmin ? 'Admin Mode' : 'User Mode'}
            </button>
            <Link
              to={isAdmin ? '/' : '/admin'}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {isAdmin ? 'View Profiles' : 'Manage Profiles'}
            </Link>
          </div>
        </div>
        
        <Routes>
          <Route
            path="/"
            element={
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {profiles.map((profile) => (
                      <ProfileCard key={profile.id} profile={profile} />
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-1 h-[calc(100vh-12rem)] sticky top-8">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                    <Map />
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>

        {selectedProfile && (
          <DetailedProfile
            profile={selectedProfile}
            onClose={() => setSelectedProfile(null)}
          />
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ProfileProvider>
        <MainContent />
      </ProfileProvider>
    </Router>
  );
}