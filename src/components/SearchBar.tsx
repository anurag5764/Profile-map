import { Search } from 'lucide-react';
import { useProfiles } from '../context/ProfileContext';

export default function SearchBar() {
  const { searchProfiles } = useProfiles();

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search profiles..."
        onChange={(e) => searchProfiles(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <Search
        size={20}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}