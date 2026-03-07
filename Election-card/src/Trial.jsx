import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const Trial = () => {
  const[candidates, setCandidates] = useState([]);

  useEffect(() => {

const fetchData = async () => {
  // try {
  //   const response = await axios.get('https://election.onlinekhabar.com/wp-json/okelapi/v1/2082/home/election-results?limit=10'); 
  //   console.log(response.data.data.party_results[3]);
  // } catch (error) {
  //   console.error('Error fetching data:', error);
  // }};

   try {
    const response2 = await axios.get('https://pub-4173e04d0b78426caa8cfa525f827daa.r2.dev/constituencies.json'); 
    console.log(response2.data[0].candidates);
  setCandidates(response2.data[0].candidates);
  } catch (error) {
    console.error('Error fetching data:', error);
  }};
  


  fetchData();
}, []);


  return (

    <>
    <div>
      <h1> 
        </h1>
         <div className="map flex flex-wrap gap-10 m-10 bg-gray-200 p-5 rounded-lg">
          
   {
  candidates
    .sort((a, b) => b.votes - a.votes)   // highest votes first
    .map((candidate) => (
      <div key={candidate.id} className='bg-blue-700 rounded-lg p-3 text-white w-48'>
        <p>Name: {candidate.name}</p>
        <p>Party: {candidate.party}</p>
        <p>Votes: {candidate.votes}</p>
      </div>
    ))
}
      </div>
    </div>
    </>

)
}

export default Trial
