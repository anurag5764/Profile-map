import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Profile, FilterOptions } from '../types';

interface ProfileContextType {
  profiles: Profile[];
  selectedProfile: Profile | null;
  setSelectedProfile: (profile: Profile | null) => void;
  addProfile: (profile: Profile) => void;
  updateProfile: (profile: Profile) => void;
  deleteProfile: (id: string) => void;
  searchProfiles: (query: string) => void;
  filterProfiles: (options: FilterOptions) => void;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'John Doe',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    description: 'Senior Software Engineer',
    address: 'San Francisco, CA',
    lat: 37.7749,
    lng: -122.4194,
    additionalDetails: {
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      website: 'https://johndoe.dev',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      bio: 'Passionate about building scalable web applications',
      experience: '8+ years in software development',
      education: 'MS Computer Science, Stanford University',
      languages: ['English', 'Spanish'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
      }
    },
  },
  {
    id: '2',
    name: 'Jane Smith',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    description: 'UX Designer',
    address: 'New York, NY',
    lat: 40.7128,
    lng: -74.0060,
    additionalDetails: {
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543',
      website: 'https://janesmith.design',
      skills: ['UI/UX', 'Figma', 'User Research', 'Design Systems'],
      bio: 'Creating beautiful and intuitive user experiences',
      experience: '5+ years in UX design',
      education: 'BFA Design, RISD',
      languages: ['English', 'French'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/janesmith',
        twitter: 'https://twitter.com/janesmith'
      }
    },
  },
];

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [originalProfiles] = useState(mockProfiles);

  const addProfile = useCallback((profile: Profile) => {
    const newProfile = {
      ...profile,
      id: crypto.randomUUID(),
      additionalDetails: {
        ...profile.additionalDetails,
        skills: profile.additionalDetails?.skills || [],
        languages: profile.additionalDetails?.languages || [],
        socialLinks: profile.additionalDetails?.socialLinks || {}
      }
    };
    setProfiles(prev => [...prev, newProfile]);
  }, []);

  const updateProfile = useCallback((profile: Profile) => {
    setProfiles(prev =>
      prev.map(p => p.id === profile.id ? {
        ...profile,
        additionalDetails: {
          ...profile.additionalDetails,
          skills: profile.additionalDetails?.skills || [],
          languages: profile.additionalDetails?.languages || [],
          socialLinks: profile.additionalDetails?.socialLinks || {}
        }
      } : p)
    );
  }, []);

  const deleteProfile = useCallback((id: string) => {
    setProfiles(prev => prev.filter(p => p.id !== id));
  }, []);

  const searchProfiles = useCallback((query: string) => {
    if (!query) {
      setProfiles(originalProfiles);
      return;
    }
    const filtered = originalProfiles.filter((profile) =>
      profile.name.toLowerCase().includes(query.toLowerCase()) ||
      profile.description.toLowerCase().includes(query.toLowerCase()) ||
      profile.additionalDetails.skills?.some(skill => 
        skill.toLowerCase().includes(query.toLowerCase())
      )
    );
    setProfiles(filtered);
  }, [originalProfiles]);

  const filterProfiles = useCallback((options: FilterOptions) => {
    let filtered = [...originalProfiles];

    if (options.skills?.length) {
      filtered = filtered.filter(profile =>
        profile.additionalDetails.skills?.some(skill =>
          options.skills?.includes(skill)
        )
      );
    }

    if (options.location) {
      filtered = filtered.filter(profile =>
        profile.address.toLowerCase().includes(options.location!.toLowerCase())
      );
    }

    if (options.experience) {
      filtered = filtered.filter(profile =>
        profile.additionalDetails.experience?.toLowerCase().includes(options.experience!.toLowerCase())
      );
    }

    setProfiles(filtered);
  }, [originalProfiles]);

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        selectedProfile,
        setSelectedProfile,
        addProfile,
        updateProfile,
        deleteProfile,
        searchProfiles,
        filterProfiles,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfiles = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfiles must be used within a ProfileProvider');
  }
  return context;
};