// import React from "react";

// interface Place {
//   name: string;
//   description: string;
// }

// const famousPlaces: Place[] = [
//   { name: "Janaki Mandir", description: "A historic temple dedicated to Sita Devi." },
//   { name: "Ram Mandir", description: "One of the oldest temples in Janakpur." },
//   { name: "Dhanush Sagar", description: "A sacred pond near Janaki Mandir." },
// ];

// const FamousPlaces: React.FC = () => {
//   return (
//     <div style={{ padding: "16px" }}>
//       <h2 className="text-xl font-bold mb-4">Famous Places in Janakpur</h2>
//       <ul>
//         {famousPlaces.map((place, index) => (
//           <li key={index} className="mb-4">
//             <h3 className="text-lg font-semibold">{place.name}</h3>
//             <p>{place.description}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FamousPlaces;

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