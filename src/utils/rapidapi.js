import axios from 'axios'

export const getAirports = async (keyword, page = '1', limit = '20', sortBy = 'AirportName:asc') => {
  console.log('rapid api key', process.env.REACT_APP_RapidAPI_Key);
  const options = {
    method: 'GET',
    url: `https://world-airports-directory.p.rapidapi.com/v1/airports/${keyword}`,
    params: {page: '1', limit: '20', sortBy: 'AirportName:asc'},
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RapidAPI_Key ,
      'X-RapidAPI-Host': process.env.REACT_APP_RapidAPI_Host 
    }
  };
  
  try {
    let response = await axios.request(options);
    return response.data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
}