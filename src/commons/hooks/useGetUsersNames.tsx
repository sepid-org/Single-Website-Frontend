import { useState, useEffect } from 'react';
import axios from 'axios';

function useGetUsersNames(userIds) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an async function to handle the request
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.post(
          'https://cms.sepid.org/api/auth/accounts/user-list/',
          { user_ids: userIds }
        );
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    // Only make the request if userIds array is provided
    if (userIds && userIds.length > 0) {
      fetchData();
    }
  }, [userIds]);

  return { data, loading, error };
}

export default useGetUsersNames;
