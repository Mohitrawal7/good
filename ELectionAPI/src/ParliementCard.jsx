import React, { useState, useMemo,useEffect } from 'react';
import { Armchair } from 'lucide-react';

const TOTAL_SEATS = 165;

const colors = [
  { id: 94, color: "#22d3ee", bg: "bg-cyan-400", lightBg: "bg-cyan-100/40" },
  { id: 2, color: "#4ade80", bg: "bg-green-500", lightBg: "bg-green-100/40" },
  { id: 1,  color: "#f87171", bg: "bg-red-400", lightBg: "bg-red-100/40" },
  { id: 99,  color: "#dc2626", bg: "bg-red-600", lightBg: "bg-red-100/40" },
  { id: 4,  color: "#fbbf24", bg: "bg-amber-400", lightBg: "bg-amber-100/40" },
  { id: 101, color: "#64748b", bg: "bg-slate-400", lightBg: "bg-slate-100/40" },
  { id: 13,  color: "#94a3b8", bg: "bg-gray-400", lightBg: "bg-gray-100/40" },
  { id: 41, color: "#1e3a8a", bg: "bg-blue-800", lightBg: "bg-blue-100/40" },
  { id: 9,  color: "#a855f7", bg: "bg-purple-500", lightBg: "bg-purple-100/40" },
  { id: 48, color: "#064e3b", bg: "bg-emerald-800", lightBg: "bg-emerald-100/40" },
];


const ParliementCard = ({parties}) => {
  


  const [selectedPartyId, setSelectedPartyId] = useState(null);

  // Map every single seat to its owner party ID
  const seatAssignments = useMemo(() => {
    const assignments = [];
    parties.forEach(party => {
      for (let i = 0; i < party.seats; i++) {
        assignments.push(party.id);
      }
    });
    return assignments;
  }, [parties]);

  useEffect(() => { 
    // If the selected party has 0 seats, reset selection to avoid confusion
    const selectedParty = parties.find(p => p.id === selectedPartyId);  
    if (selectedPartyId && selectedParty && selectedParty.seats === 0) {
      setSelectedPartyId(null);
    }
    }, [selectedPartyId, parties]);

  const renderSeats = () => {
    const rows = [12, 16, 20, 24, 28, 32, 33]; // Adjusted distribution for 165
    let seatIndex = 0;
    const svgElements = [];

    rows.forEach((seatsInRow, rowIndex) => {
      const radius = 90 + rowIndex * 20; 
      const startAngle = Math.PI; 
      const endAngle = 0;
      
      for (let i = 0; i < seatsInRow; i++) {
        if (seatIndex >= TOTAL_SEATS) break;

        const angle = startAngle - (i / (seatsInRow - 1)) * (startAngle - endAngle);
        const x = 200 + radius * Math.cos(angle);
        const y = 230 - radius * Math.sin(angle);
        
        const ownerId = seatAssignments[seatIndex];
        const party = parties.find(p => p.id === ownerId);
        
        // HIGHLIGHT LOGIC:
        // If no party is selected, show all colors.
        // If a party is selected, only show colors for that party, others become ghost-gray.
        const isHighlighted = !selectedPartyId || selectedPartyId === ownerId;
        const seatColor = (party && isHighlighted) ? party.color : "#f1f5f9"; // faint gray for non-active
        const seatOpacity = isHighlighted ? 1 : 0.2;

        svgElements.push(
          <g key={seatIndex} transform={`translate(${x},${y}) rotate(${(90 - (angle * 180) / Math.PI)})`}>
            <Armchair 
              size={11} 
              fill={seatColor} 
              stroke={seatColor} 
              strokeWidth={0.5}
              style={{ opacity: seatOpacity }}
              className="transition-all duration-300 cursor-pointer hover:scale-125"
            />
          </g>
        );
        seatIndex++;
      }
    });
    return svgElements;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg border border-gray-100">
        
        {/* Upper Half: Interactive Seating Chart */}
        <div className="relative p-10 mb-6">
          <svg viewBox="0 0 400 250" className="w-full h-auto">
            {renderSeats()}
            
            {/* Center Summary */}
            <text x="200" y="215" textAnchor="middle" className="text-5xl font-bold fill-slate-800 tracking-tighter">
              १६५
            </text>
            <text x="200" y="240" textAnchor="middle" className="text-xs font-semibold fill-slate-400 uppercase tracking-[0.2em]">
              प्रत्यक्ष सिट
            </text>
          </svg>
        </div>

        {/* Lower Half: Party Result Table */}
        <div className="space-y-2.5">
          {parties.map((party) => {
            const isActive = selectedPartyId === party.id;
            const isDimmed = selectedPartyId !== null && !isActive;
            const colorInfo = colors.find(c => c.id === party.id);
            return (
              <div 
                key={party.id} 
                onClick={() => setSelectedPartyId(isActive ? null : party.id)}
                className={`flex items-center rounded-lg overflow-hidden transition-all duration-300 cursor-pointer
                  ${isDimmed ? 'opacity-40 grayscale-[0.5]' : 'opacity-100'}
                  ${isActive ? 'ring-2 ring-offset-2 ring-blue-400 scale-[1.02]' : 'hover:scale-[1.01]'}`}
              >
                {/* Left Part: Solid Color Label */}
                <div className={`w-36 ${colorInfo?.bg} text-black text-[13px] font-bold py-2 px-4 transition-colors`}>
                  {party.name}
                </div>

                {/* Right Part: Faded/Half-Color Progress Container */}
                <div className={`flex-1 h-9 ${colorInfo?.lightBg} relative flex items-center pr-3 group`}>
                   {/* Progress Fill (calculated relative to total seats) */}
                   <div 
                    className={`absolute left-0 top-0 bottom-0 ${colorInfo?.bg} opacity-30 transition-all duration-700`}
                    style={{ width: `${(party.seats / TOTAL_SEATS) * 100}%` }}
                   />
                   
                   {/* Visual "Half Color" Fill (mimicking the solid block look in your image) */}
                   <div 
                    className={`absolute left-0 top-0 bottom-0 ${colorInfo?.bg} opacity-10 transition-all`}
                    style={{ width: party.seats > 0 ? '45%' : '0%' }}
                   />

                   <span className={`ml-auto text-sm font-black transition-colors ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                    {party.seats} सिट
                   </span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Reset hint */}
        {selectedPartyId && (
          <p className="text-center mt-4 text-[10px] text-slate-400 italic">
            क्लिक गर्नुहोस् कुनै पार्टीलाई रिसेट गर्न
          </p>
        )}
      </div>
    </div>
  );
}


export default ParliementCard;