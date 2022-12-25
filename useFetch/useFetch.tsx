import { useEffect, useState } from 'react';

type Data = {
  // Data type
};

const url = 'https://...';

export const useFetch = (): { loading: boolean; data: Data } => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Data>([]);

  const getData = async () => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);
  return { loading, data };
};
