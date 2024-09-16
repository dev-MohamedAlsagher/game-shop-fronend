import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';

const baseUrl = import.meta.env.VITE_API_URL;

const getUserInfo = async(token) => {
  const response = await axios.get(`${baseUrl}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Failed to fetch user information');
  }
};

export const updateUser = (token) => async (updatedUserData) => {
  try {
    const response = await axios.put(`${baseUrl}/users`, updatedUserData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        return Promise.reject(error.response.data || 'updating failed with status code 400');
      }
      return Promise.reject(`Unexpected response status: ${error.response.status}`);
    } else {
      return Promise.reject('Network error: Unable to connect to the server');
    }
  }
};

export const useUserInfo = (token) => {
  const { data, isLoading, isError, error } = useQuery('userInfo', () => getUserInfo(token), {
    enabled: !!token,
  });

  return {
    userInfo: data,
    isLoading,
    isError,
    error,
  };
};


export const deleteUser = async(token) => {
  try {
    const response = await axios.delete(`${baseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        return Promise.reject(
          error.response.data || 'deleting user failed with status code 400'
        );
      }
      return Promise.reject(`Unexpected response status: ${error.response.status}`);
    } else {
      return Promise.reject('Network error: Unable to connect to the server');
    }
  }
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteUser, {
    onSuccess: () => {
      console.log('User deleted!');
      queryClient.invalidateQueries('userInfo');
    },
    onError: (error) => {
      console.error('Error deleting user:', error);
    },
  });

  const deleteUserHandler = async (token) => {
    try {
      await mutation.mutateAsync(token);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return {
    deleteUserHandler,
    isLoading: mutation.isLoading,
  };
};
