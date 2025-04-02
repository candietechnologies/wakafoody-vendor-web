import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";

const fetchData = async (url, token, logout, useHeaders) => {
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const { data } = await axios.get(url, useHeaders ? { headers } : {});
    return data;
  } catch (error) {
    const errMessage = error.response?.data?.message || "Something went wrong";

    if (errMessage.toLowerCase() === "unauthenticated") logout();

    throw new Error(errMessage);
  }
};

const useGet = (url, queryKey, useHeaders = true) => {
  const { token, logout } = useAuth();

  return useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchData(url, token, logout, useHeaders),
    onError: () => {
      toast.error("An unexpected error occurred");
    },
  });
};

export default useGet;
