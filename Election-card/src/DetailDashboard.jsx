import React from 'react';

const DetailDashboard = ({ parties, addSeat, removeSeat }) => {


  return (

    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">विवरणात्मक ड्यासबोर्ड</h2>
        <p className="text-gray-700 mb-6">यहाँ विभिन्न पार्टीहरूको विवरणात्मक ड्यासबोर्ड देखाइएको छ। प्रत्येक पार्टीको नाम, सीट संख्या, र रंग कोड सहित जानकारी प्रस्तुत गरिएको छ।</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {parties.map(party => (
            <div key={party.id} className={`p-4 flex gap-20  rounded-lg shadow-md ${party.bg} ${party.lightBg}`}>
              <div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: party.color }}>{party.name}</h3>
               
               <p className="text-gray-800">सीट संख्या: {party.seats}</p> 
                  </div>

               <div className='flex flex-col items-center justify-center'>
                <button onClick={() => addSeat(party.id)} className={`${party.lightBg} text-black`}  > +</button>
                <button onClick={() => removeSeat(party.id)} className={`${party.lightBg} text-black`} >-</button>
            </div>
            </div>
          ))}

        </div>


      </div>

    </div>
   )
}

export default DetailDashboard