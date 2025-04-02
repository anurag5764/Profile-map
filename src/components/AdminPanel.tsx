import { useState } from 'react';
import { useProfiles } from '../context/ProfileContext';
import { Trash2, Edit, Plus } from 'lucide-react';
import type { Profile } from '../types';

export default function AdminPanel() {
  const { profiles, deleteProfile, addProfile, updateProfile, isAdmin } = useProfiles();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Profile>>({
    name: '',
    description: '',
    photo: '',
    address: '',
    lat: 0,
    lng: 0,
    additionalDetails: {
      email: '',
      phone: '',
      website: '',
      skills: [],
      experience: '',
      education: '',
      languages: [],
      socialLinks: {
        linkedin: '',
        github: '',
        twitter: ''
      }
    }
  });

  if (!isAdmin) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Admin Access Required</h2>
        <p className="text-gray-600">You need admin privileges to access this section.</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const profileData = {
      ...formData,
      id: isEditing || crypto.randomUUID(),
      additionalDetails: {
        ...formData.additionalDetails,
        skills: formData.additionalDetails?.skills || [],
        languages: formData.additionalDetails?.languages || [],
        socialLinks: formData.additionalDetails?.socialLinks || {}
      }
    } as Profile;

    if (isEditing) {
      updateProfile(profileData);
    } else {
      addProfile(profileData);
    }
    
    setIsEditing(null);
    setShowForm(false);
    setFormData({
      name: '',
      description: '',
      photo: '',
      address: '',
      lat: 0,
      lng: 0,
      additionalDetails: {
        email: '',
        phone: '',
        website: '',
        skills: [],
        experience: '',
        education: '',
        languages: [],
        socialLinks: {
          linkedin: '',
          github: '',
          twitter: ''
        }
      }
    });
  };

  const handleEdit = (profile: Profile) => {
    setIsEditing(profile.id);
    setFormData(profile);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setIsEditing(null);
    setFormData({
      name: '',
      description: '',
      photo: '',
      address: '',
      lat: 0,
      lng: 0,
      additionalDetails: {
        email: '',
        phone: '',
        website: '',
        skills: [],
        experience: '',
        education: '',
        languages: [],
        socialLinks: {
          linkedin: '',
          github: '',
          twitter: ''
        }
      }
    });
    setShowForm(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Profile Management</h2>
      
      <div className="mb-8">
        <button
          onClick={handleAddNew}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus size={18} className="mr-2" />
          Add New Profile
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Photo URL</label>
            <input
              type="url"
              value={formData.photo || ''}
              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Latitude</label>
              <input
                type="number"
                step="any"
                value={formData.lat || 0}
                onChange={(e) => setFormData({ ...formData, lat: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Longitude</label>
              <input
                type="number"
                step="any"
                value={formData.lng || 0}
                onChange={(e) => setFormData({ ...formData, lng: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.additionalDetails?.email || ''}
              onChange={(e) => setFormData({
                ...formData,
                additionalDetails: {
                  ...formData.additionalDetails,
                  email: e.target.value
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={formData.additionalDetails?.phone || ''}
              onChange={(e) => setFormData({
                ...formData,
                additionalDetails: {
                  ...formData.additionalDetails,
                  phone: e.target.value
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Website</label>
            <input
              type="url"
              value={formData.additionalDetails?.website || ''}
              onChange={(e) => setFormData({
                ...formData,
                additionalDetails: {
                  ...formData.additionalDetails,
                  website: e.target.value
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Experience</label>
            <input
              type="text"
              value={formData.additionalDetails?.experience || ''}
              onChange={(e) => setFormData({
                ...formData,
                additionalDetails: {
                  ...formData.additionalDetails,
                  experience: e.target.value
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Education</label>
            <input
              type="text"
              value={formData.additionalDetails?.education || ''}
              onChange={(e) => setFormData({
                ...formData,
                additionalDetails: {
                  ...formData.additionalDetails,
                  education: e.target.value
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setIsEditing(null);
                setShowForm(false);
                setFormData({
                  name: '',
                  description: '',
                  photo: '',
                  address: '',
                  lat: 0,
                  lng: 0,
                  additionalDetails: {
                    email: '',
                    phone: '',
                    website: '',
                    skills: [],
                    experience: '',
                    education: '',
                    languages: [],
                    socialLinks: {
                      linkedin: '',
                      github: '',
                      twitter: ''
                    }
                  }
                });
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {isEditing ? 'Update' : 'Create'} Profile
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center space-x-4">
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium">{profile.name}</h3>
                <p className="text-sm text-gray-500">{profile.description}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(profile)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this profile?')) {
                    deleteProfile(profile.id);
                  }
                }}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}