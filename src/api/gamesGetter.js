import { useQuery } from 'react-query';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;

const fetchGames = async () => {
  try {
    const response = await axios.get(`${baseUrl}/games`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch games");
  }
};

export const useGames = () => {
  return useQuery('games', fetchGames, {
    staleTime: 30000,
  });
};