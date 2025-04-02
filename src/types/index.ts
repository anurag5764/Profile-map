export interface Profile {
  id: string;
  name: string;
  photo: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  additionalDetails: {
    email?: string;
    phone?: string;
    website?: string;
    skills?: string[];
    bio?: string;
    experience?: string;
    education?: string;
    languages?: string[];
    socialLinks?: {
      linkedin?: string;
      github?: string;
      twitter?: string;
    };
  };
}

export interface FilterOptions {
  skills?: string[];
  location?: string;
  experience?: string;
}