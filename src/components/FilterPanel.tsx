import { useState } from 'react';
import { Filter } from 'lucide-react';
import { useProfiles } from '../context/ProfileContext';
import type { FilterOptions } from '../types';

export default function FilterPanel() {
  const { filterProfiles } = useProfiles();
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    skills: [],
    location: '',
    experience: '',
  });

  const handleFilter = () => {
    filterProfiles(filters);
    setIsOpen(false);
  };

  const handleSkillChange = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills?.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...(prev.skills || []), skill],
    }));
  };

  const skillOptions = [
    'React', 'TypeScript', 'Node.js', 'AWS',
    'UI/UX', 'Figma', 'User Research', 'Design Systems',
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
      >
        <Filter size={18} className="mr-2" />
        Filters
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-64 bg-white rounded-lg shadow-lg p-4 z-10">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
              <div className="space-y-2">
                {skillOptions.map((skill) => (
                  <label key={skill} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.skills?.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter location..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
              <select
                value={filters.experience}
                onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Any</option>
                <option value="junior">Junior (1-3 years)</option>
                <option value="mid">Mid-Level (3-5 years)</option>
                <option value="senior">Senior (5+ years)</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                onClick={() => {
                  setFilters({ skills: [], location: '', experience: '' });
                  filterProfiles({});
                  setIsOpen(false);
                }}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
              >
                Clear
              </button>
              <button
                onClick={handleFilter}
                className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}