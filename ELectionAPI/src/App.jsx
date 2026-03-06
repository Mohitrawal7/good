import React, { useState, useEffect } from "react";
import ParliementCard from "./ParliementCard";
import axios from "axios";
import Trial from "./trial";
import mainBanner from "./main.png";

const INITIAL_DATA = [
  {
    id: 1,
    name: "रास्वपा",
    seats: 123,
    color: "#22d3ee",
    bg: "bg-cyan-400",
    lightBg: "bg-cyan-100/40",
  },
  {
    id: 2,
    name: "कांग्रेस",
    seats: 20,
    color: "#4ade80",
    bg: "bg-green-500",
    lightBg: "bg-green-100/40",
  },
  {
    id: 3,
    name: "एमाले",
    seats: 7,
    color: "#f87171",
    bg: "bg-red-400",
    lightBg: "bg-red-100/40",
  },
  {
    id: 4,
    name: "नेकपा",
    seats: 8,
    color: "#dc2626",
    bg: "bg-red-600",
    lightBg: "bg-red-100/40",
  },
  {
    id: 5,
    name: "राप्रपा",
    seats: 1,
    color: "#fbbf24",
    bg: "bg-amber-400",
    lightBg: "bg-amber-100/40",
  },
  {
    id: 6,
    name: "श्रम संस्कृति",
    seats: 0,
    color: "#64748b",
    bg: "bg-slate-400",
    lightBg: "bg-slate-100/40",
  },
  {
    id: 7,
    name: "स्वतन्त्र",
    seats: 1,
    color: "#94a3b8",
    bg: "bg-gray-400",
    lightBg: "bg-gray-100/40",
  },
  {
    id: 8,
    name: "जसपा, नेपाल",
    seats: 0,
    color: "#1e3a8a",
    bg: "bg-blue-800",
    lightBg: "bg-blue-100/40",
  },
  {
    id: 9,
    name: "नाउपा",
    seats: 0,
    color: "#a855f7",
    bg: "bg-purple-500",
    lightBg: "bg-purple-100/40",
  },
  {
    id: 10,
    name: "जनमत",
    seats: 0,
    color: "#064e3b",
    bg: "bg-emerald-800",
    lightBg: "bg-emerald-100/40",
  },
];

const App = () => {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://election.onlinekhabar.com/wp-json/okelapi/v1/2082/home/election-results?limit=10",
      );

      const partyResults = response.data.data.party_results;

      const formatted = partyResults.map((party) => ({
        id: party.party_id,
        name: party.party_name,
        color: party.party_color,
        seats: party.leading_count + party.winner_count, // 🔑 seat data
      }));

      setParties(formatted);
    };
    fetchData();
  }, []);

  return (
    <>
      <img className="mx-20 mr-30 mt-8 w-[85%] "
        src={mainBanner}
        alt="Sagarmatha Select banner featuring snow-capped mountain peaks in the background. Bold blue text reads UNSHAKABLE with Devanagari script सगरमाथा सिलेक्ट below. On the right side are three product boxes displaying yellow and dark packaging with Nepali text. The tagline पुरी चुस्तीमाई appears at the bottom right, suggesting a food or beverage product line."
      />
      <div className="flex ml-20 mt-10 gap-4">
        <Trial />
        <ParliementCard parties={parties} />
      </div>
    </>
  );
};

export default App;
