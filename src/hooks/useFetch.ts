import { useEffect, useState } from 'react';

interface FetchParams<T> {
  url: string;
  method?: 'GET' | 'POST' | 'PUT';
  dependencies?: any[];
  body?: Record<string, any>;
  onSuccess?: (data: T) => void;
  onInit?: () => void;
  onError?: () => void;
  onFinally?: () => void;
}

export const useFetch = <T>({ url, method = 'GET', body, dependencies = [], onSuccess, onInit, onError, onFinally }: FetchParams<T>) => {
  const [isError, setIsError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<T | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(null);
        setIsError(false);
        setIsFetching(true);
        onInit?.();

        const resPro = await fetch(url, {
          method,
          ...(body && { body: JSON.stringify(body) }),
          headers: { 'Content-Type': 'application/json' },
        });
        const res = await resPro.json();

        if (!res) {
          setIsError(true);
          onError?.();
          return;
        }

        setData(res);
        onSuccess?.(res);
      } catch (err) {
        setIsError(true);
        onError?.();
      } finally {
        setIsFetching(false);
        onFinally?.();
      }
    };

    fetchData();
  }, [...dependencies]);

  return { isFetching, isError, data };
};
