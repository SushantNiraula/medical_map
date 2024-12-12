/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
// import GoogleMap from "google-maps-react-markers";
import { useCallback, useEffect, useState } from "react";

type MapInstance = google.maps.Map | null;

type Place = {
  id: string;
  name: string;
  location: { lat: number; lng: number };
};

const App: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCIhlu48Rgp5oPbgPAV6CTslmRu5S1mI6g",
  });

  const [map, setMap] = useState<MapInstance>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  /**
   * @description This function is called when the map is ready
   * @param {Object} map - reference to the map instance
   * @param {Object} maps - reference to the maps library
   */

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setUserLocation(location);

          // Fetch places near the user's location
          fetchPlaces(location);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchPlaces = async (location: { lat: number; lng: number }) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=1500&type=hospital&key=AIzaSyCIhlu48Rgp5oPbgPAV6CTslmRu5S1mI6g`
      );
      const data = await response.json();

      if (data.results) {
        const fetchedPlaces = data.results.map((place: any) => ({
          id: place.place_id,
          name: place.name,
          location: {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
          },
        }));

        setPlaces(fetchedPlaces);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  return isLoaded && userLocation ? (
    <GoogleMap
      mapContainerStyle={{ width: "1366px", height: "658px", margin: "auto" }}
      center={userLocation}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Render markers for places */}
      {places.map((place) => (
        <Marker key={place.id} position={place.location} title={place.name} />
      ))}
    </GoogleMap>
  ) : (
    <p>Loading...</p>
  );
};

export default App;
