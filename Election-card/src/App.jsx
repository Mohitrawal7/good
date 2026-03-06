import React, { useState } from "react";
import ParliementCard from "./ParliementCard";
import DetailDashboard from "./DetailDashboard";
import Trial from "./trial";

const INITIAL_DATA = [
  { id: 1, name: "रास्वपा", seats: 123, color: "#22d3ee", bg: "bg-cyan-400", lightBg: "bg-cyan-100/40" },
  { id: 2, name: "कांग्रेस", seats: 20, color: "#4ade80", bg: "bg-green-500", lightBg: "bg-green-100/40" },
  { id: 3, name: "एमाले", seats: 7, color: "#f87171", bg: "bg-red-400", lightBg: "bg-red-100/40" },
  { id: 4, name: "नेकपा", seats: 8, color: "#dc2626", bg: "bg-red-600", lightBg: "bg-red-100/40" },
  { id: 5, name: "राप्रपा", seats: 1, color: "#fbbf24", bg: "bg-amber-400", lightBg: "bg-amber-100/40" },
  { id: 6, name: "श्रम संस्कृति", seats: 0, color: "#64748b", bg: "bg-slate-400", lightBg: "bg-slate-100/40" },
  { id: 7, name: "स्वतन्त्र", seats: 1, color: "#94a3b8", bg: "bg-gray-400", lightBg: "bg-gray-100/40" },
  { id: 8, name: "जसपा, नेपाल", seats: 0, color: "#1e3a8a", bg: "bg-blue-800", lightBg: "bg-blue-100/40" },
  { id: 9, name: "नाउपा", seats: 0, color: "#a855f7", bg: "bg-purple-500", lightBg: "bg-purple-100/40" },
  { id: 10, name: "जनमत", seats: 0, color: "#064e3b", bg: "bg-emerald-800", lightBg: "bg-emerald-100/40" },
];

const App = () => {

  const [parties, setParties] = useState(INITIAL_DATA);

  const addSeat = (id) => {
    console.log("Adding seat to party with id:", id);
    console.log(totalSeats);
    if(totalSeats > 165) {
      alert("सीट संख्या 165 भन्दा बढी हुन सक्दैन। कृपया कुनै सीट घटाउनुहोस्।");
      return;
    }
    else{
    setParties(parties.map(p =>
      p.id === id ? { ...p, seats: p.seats + 1 } : p
    ));
  }
  };

  const removeSeat = (id) => {
    setParties(parties.map(p =>
      p.id === id && p.seats > 0 ? { ...p, seats: p.seats - 1 } : p
    ));
  };
const totalSeats = parties.reduce((sum, party) => sum + party.seats, 0);

  return (
    <>
    <div className="flex gap-4">
      <ParliementCard parties={parties} />
      <DetailDashboard
        parties={parties}
        addSeat={addSeat}
        removeSeat={removeSeat}
      />
      </div>

      <Trial/>
    </>
  );
};


export default App