import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Trial = () => {

const fetchData = async () => {
  try {
    const response = await axios.get('https://election.onlinekhabar.com/wp-json/okelapi/v1/2082/home/election-results?limit=10'); 
    console.log(response.data.data.party_results[3]);
  } catch (error) {
    console.error('Error fetching data:', error);
  }};

useEffect(() => {
  fetchData();
}, []);


  return (

    <>
    <div>
      <h1>Trial Component</h1>
    </div>
    </>

)
}

export default Trial