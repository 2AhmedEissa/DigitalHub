import axios from "axios";
import useSWR from "swr";

const apiUrl = import.meta.env.VITE_API;

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function useUsersSWR() {
  const { data, error, isLoading } = useSWR(apiUrl, fetcher);

  return {
    users: data ?? [],
    isLoading,
    isError: !!error,
  };
}
