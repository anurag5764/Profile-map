import { useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useProfiles } from "../context/ProfileContext";
import type { Profile } from "../types";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 40.7128,
  lng: -74.006,
};

export default function Map() {
  const { profiles, selectedProfile, setSelectedProfile } = useProfiles();
  const [activeMarker, setActiveMarker] = useState<Profile | null>(null);
  const mapApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: mapApiKey,
  });

  useEffect(() => {
    if (selectedProfile) {
      setActiveMarker(selectedProfile);
    }
  }, [selectedProfile]);

  const handleMarkerClick = useCallback(
    (profile: Profile) => {
      setActiveMarker(profile);
      setSelectedProfile(profile);
    },
    [setSelectedProfile]
  );

  if (loadError) return <div className="text-red-500">Error loading maps</div>;
  if (!isLoaded) return <div className="text-gray-500">Loading maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={4}
      center={
        selectedProfile
          ? { lat: selectedProfile.lat, lng: selectedProfile.lng }
          : center
      }
      options={{
        styles: [
          {
            featureType: "all",
            elementType: "all",
            stylers: [{ saturation: -100 }],
          },
        ],
      }}
    >
      {profiles.map((profile) => (
        <Marker
          key={profile.id}
          position={{ lat: profile.lat, lng: profile.lng }}
          onClick={() => handleMarkerClick(profile)}
        />
      ))}

      {activeMarker && (
        <InfoWindow
          position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
          onCloseClick={() => setActiveMarker(null)}
        >
          <div className="p-2">
            <img
              src={activeMarker.photo}
              alt={activeMarker.name}
              className="w-16 h-16 rounded-full mb-2"
            />
            <h3 className="font-semibold">{activeMarker.name}</h3>
            <p className="text-sm text-gray-600">{activeMarker.description}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
