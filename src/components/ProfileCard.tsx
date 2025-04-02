import { MapPin } from 'lucide-react';
import { useProfiles } from '../context/ProfileContext';
import type { Profile } from '../types';

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const { setSelectedProfile } = useProfiles();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <img
        src={profile.photo}
        alt={profile.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{profile.name}</h3>
        <p className="text-gray-600 mb-3">{profile.description}</p>
        <div className="flex items-center text-gray-500 mb-4">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{profile.address}</span>
        </div>
        <button
          onClick={() => setSelectedProfile(profile)}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          View Summary
        </button>
      </div>
    </div>
  );
}