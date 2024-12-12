
// "use client";
// import React, { useRef, useEffect } from "react";

// interface MarkerData {
//   position: { lat: number; lng: number };
//   name: string;
//   description: string;
// }

// // Extend the Window interface to include the google property and initMap function
// declare global {
//   interface Window {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     google: any;
//     initMap: () => void;
//   }
// }

// interface MapProps {
//   onMarkerClick: (place: MarkerData | null) => void;
// }

// const Map: React.FC<MapProps> = ({ onMarkerClick }) => {
//   const mapRef = useRef<HTMLDivElement | null>(null);

//   const markersData: MarkerData[] = [
    
//   ];

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCIhlu48Rgp5oPbgPAV6CTslmRu5S1mI6g&callback=initMap`;
//     script.async = true;

//     window.initMap = () => {
//       if (mapRef.current) {
//         const map = new window.google.maps.Map(mapRef.current, {
//           center: { lat: 26.729006, lng: 85.924764 },
//           zoom: 12,
//         });

//         const bounds = new window.google.maps.LatLngBounds();

//         // Add markers and extend bounds
//         markersData.forEach((markerData) => {
//           const marker = new window.google.maps.Marker({
//             position: markerData.position,
//             map,
//             title: markerData.name,
//           });

//           // Extend bounds to include the marker's position
//           bounds.extend(markerData.position);

//           // Add click event to marker
//           marker.addListener("click", () => {
//             onMarkerClick(markerData);
//           });
//         });

//         // Fit map to bounds
//         map.fitBounds(bounds);

//         // Default behavior when clicking outside any marker
//         map.addListener("click", () => {
//           onMarkerClick(null);
//         });
//       }
//     };

//     document.body.appendChild(script);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [onMarkerClick]);

//   return (
//     <div
//       ref={mapRef}
//       style={{
//         width: "100%",
//         height: "100%",
//         border: "2px solid #333",
//         borderRadius: "8px",
//       }}
//     />
//   );
// };

// export default Map;

// "use client";
// import React, { useRef, useEffect } from "react";

// interface MarkerData {
//   position: { lat: number; lng: number };
//   name: string;
//   description: string;
// }

// declare global {
//   interface Window {
//     google: any;
//     initMap: () => void;
//   }
// }

// interface MapProps {
//   userLocation: { lat: number; lng: number };
// }

// const Map: React.FC<MapProps> = ({ userLocation }) => {
//   const mapRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCIhlu48Rgp5oPbgPAV6CTslmRu5S1mI6g&libraries=places&callback=initMap`;
//     script.async = true;

//     window.initMap = () => {
//       if (mapRef.current) {
//         const map = new window.google.maps.Map(mapRef.current, {
//           center: userLocation,
//           zoom: 14,
//         });

//         const service = new window.google.maps.places.PlacesService(map);
//         const directionsService = new window.google.maps.DirectionsService();
//         const directionsRenderer = new window.google.maps.DirectionsRenderer();

//         directionsRenderer.setMap(map);

//         // Search for nearby hospitals and clinics
//         const request = {
//           location: userLocation,
//           radius: 5000,
//           type: ["hospital", "clinic"],
//         };

//         service.nearbySearch(request, (results: any[], status: string) => {
//           if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//             results.forEach((place) => {
//               if (place.geometry?.location) {
//                 const marker = new window.google.maps.Marker({
//                   position: place.geometry.location,
//                   map,
//                   title: place.name,
//                 });

//                 marker.addListener("click", () => {
//                   directionsService.route(
//                     {
//                       origin: userLocation,
//                       destination: place.geometry.location,
//                       travelMode: window.google.maps.TravelMode.DRIVING,
//                     },
//                     (response, status) => {
//                       if (status === window.google.maps.DirectionsStatus.OK) {
//                         directionsRenderer.setDirections(response);
//                       } else {
//                         console.error("Directions request failed due to " + status);
//                       }
//                     }
//                   );
//                 });
//               }
//             });
//           }
//         });
//       }
//     };

//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, [userLocation]);

//   return (
//     <div
//       ref={mapRef}
//       style={{
//         width: "100%",
//         height: "100%",
//         border: "2px solid #333",
//         borderRadius: "8px",
//       }}
//     />
//   );
// };

// export default Map;

"use client";
import React, { useRef, useEffect } from "react";

interface MapProps {
  userLocation: { lat: number; lng: number };
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const Map: React.FC<MapProps> = ({ userLocation }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=https://maps.googleapis.com/maps/api/js?key=AIzaSyCIhlu48Rgp5oPbgPAV6CTslmRu5S1mI6g&callback=initMap&libraries=places&callback=initMap`;
    script.async = true;

    script.onload = () => {
      if (window.google && mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: userLocation,
          zoom: 14,
        });

        const service = new window.google.maps.places.PlacesService(map);

        const request = {
          location: new window.google.maps.LatLng(userLocation.lat, userLocation.lng),
          radius: 5000,
          type: ["hospital", "clinic"],
        };

        service.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            results.forEach((place) => {
              if (place.geometry?.location) {
                new window.google.maps.Marker({
                  position: place.geometry.location,
                  map,
                  title: place.name,
                });
              }
            });
          } else {
            console.error("Nearby search failed:", status);
          }
        });
      }
    };

    script.onerror = () => console.error("Failed to load Google Maps script.");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [userLocation]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "500px",
        border: "2px solid #333",
        borderRadius: "8px",
      }}
    />
  );
};

export default Map;