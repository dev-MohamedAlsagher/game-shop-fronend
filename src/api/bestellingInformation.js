import { useQuery } from 'react-query';
import axios from 'axios';
import { useToken } from '../components/context/tokenHooks';





const baseUrl = import.meta.env.VITE_API_URL;


export const useGetAllBestellingen = () => {
  const { token } = useToken();

  const getBestellingen = async () => {
    try{
    const response = await axios.get(`${baseUrl}/bestelling`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch(error){
    if (error.response) {
      return Promise.reject(`Unexpected response status: ${error.response.status}`);
    } else {
      return Promise.reject('Network error: Unable to connect to the server');
    }
  }
};
 
  return useQuery('bestellingen', getBestellingen, {
    enabled: !!token,
  });
};




  export const createBestelling = (token) => async (newBestellingData) => {
    try{
    const response = await axios.post(`${baseUrl}/bestelling`, newBestellingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch(error){
    if (error.response) {
      return Promise.reject(`Unexpected response status: ${error.response.status}`);
    } else {
      return Promise.reject('Network error: Unable to connect to the server');
    }
  }
};

