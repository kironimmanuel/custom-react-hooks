import { useEffect, useState } from 'react';

export function useFetch<T>(url: string): {
  loading: boolean;
  error: Error | null;
  data: T | null;
} {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [url]);

  return { loading, error, data };
}
