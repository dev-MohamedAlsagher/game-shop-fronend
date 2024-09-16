import axios from 'axios'; 
const baseUrl = import.meta.env.VITE_API_URL;


const userLogin = (setAuthToken) => async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/users/login`, formData);
    if (response.status === 200) {
      setAuthToken(response.data.token);
      return response.data;
    } else if (response.status === 400) {
      if (response.data) {
        throw response.data;
      } else {
        throw new Error('Login failed with status code 400');
      }
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
};

export {userLogin};



export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/users/register`, formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        throw new Error(error.response.data.message || 'Registration failed with status code 400');
      }
      throw new Error(`Unexpected response status: ${error.response.status}`);
    } else {
      throw new Error('Network error: Unable to connect to the server');
    }
  }
};