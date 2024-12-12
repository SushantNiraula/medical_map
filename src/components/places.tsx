import React from "react";

interface MarkerData {
  name: string;
  description: string;
}

interface FamousPlacesProps {
  selectedPlace: MarkerData | null;
}

const FamousPlaces: React.FC<FamousPlacesProps> = ({ selectedPlace }) => {
  const generalInfo = {
    name: "Janakpur",
    description:
      "Janakpur is a historic city known as the birthplace of Sita Devi and a center of Maithili culture. It is home to several temples and sacred ponds.",
  };

  const place = selectedPlace || generalInfo;

  return (
    <div style={{ padding: "16px" }}>
      <h2 className="text-xl font-bold mb-4">{place.name}</h2>
      <p>{place.description}</p>
    </div>
  );
};

export default FamousPlaces;
