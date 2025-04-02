import { X, MapPin, Mail, Phone, Globe, Briefcase, GraduationCap, Languages } from 'lucide-react';
import type { Profile } from '../types';

interface DetailedProfileProps {
  profile: Profile;
  onClose: () => void;
}

export default function DetailedProfile({ profile, onClose }: DetailedProfileProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={profile.photo}
            alt={profile.name}
            className="w-full h-48 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
          <p className="text-gray-600 mb-4">{profile.description}</p>

          <div className="space-y-6">
            <div className="flex items-center text-gray-600">
              <MapPin size={18} className="mr-2" />
              <span>{profile.address}</span>
            </div>

            {profile.additionalDetails.email && (
              <div className="flex items-center text-gray-600">
                <Mail size={18} className="mr-2" />
                <a href={`mailto:${profile.additionalDetails.email}`} className="hover:text-indigo-600">
                  {profile.additionalDetails.email}
                </a>
              </div>
            )}

            {profile.additionalDetails.phone && (
              <div className="flex items-center text-gray-600">
                <Phone size={18} className="mr-2" />
                <a href={`tel:${profile.additionalDetails.phone}`} className="hover:text-indigo-600">
                  {profile.additionalDetails.phone}
                </a>
              </div>
            )}

            {profile.additionalDetails.website && (
              <div className="flex items-center text-gray-600">
                <Globe size={18} className="mr-2" />
                <a href={profile.additionalDetails.website} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">
                  {profile.additionalDetails.website}
                </a>
              </div>
            )}

            {profile.additionalDetails.experience && (
              <div className="flex items-start text-gray-600">
                <Briefcase size={18} className="mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Experience</h3>
                  <p>{profile.additionalDetails.experience}</p>
                </div>
              </div>
            )}

            {profile.additionalDetails.education && (
              <div className="flex items-start text-gray-600">
                <GraduationCap size={18} className="mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Education</h3>
                  <p>{profile.additionalDetails.education}</p>
                </div>
              </div>
            )}

            {profile.additionalDetails.languages && (
              <div className="flex items-start text-gray-600">
                <Languages size={18} className="mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Languages</h3>
                  <p>{profile.additionalDetails.languages.join(', ')}</p>
                </div>
              </div>
            )}

            {profile.additionalDetails.skills && (
              <div>
                <h3 className="font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.additionalDetails.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.additionalDetails.socialLinks && (
              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold mb-2">Social Links</h3>
                <div className="flex space-x-4">
                  {Object.entries(profile.additionalDetails.socialLinks).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-indigo-600 capitalize"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}