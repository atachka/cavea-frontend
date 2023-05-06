import { useState, useEffect } from "react";
import { FetchStateType } from "../types";

export const useFetch = <T>(
  url: string,
  deleted: boolean
): FetchStateType<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(url);
        const jsonData = (await response.json()) as T;
        setData(jsonData);
      } catch (err: unknown) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, deleted]);

  return { data, loading, error };
};
