import { useEffect, useState } from 'react';

interface FetchParams {
  url: string;
  method?: 'GET' | 'POST' | 'PUT';
  dependencies?: any[];
  body?: Record<string, any>;
}

export const useFetch = <T>({ url, method = 'GET', body, dependencies = [] }: FetchParams) => {
  const [isError, setIsError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<T | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(null);
        setIsError(false);
        setIsFetching(true);

        const resPro = await fetch(url, {
          method,
          ...(body && { body: JSON.stringify(body) }),
          headers: { 'Content-Type': 'application/json' },
        });

        const res = await resPro.json();

        if (!res) {
          setIsError(true);
          return;
        }

        setData(res);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [...dependencies]);

  return { isFetching, isError, data };
};
