import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";

const deleteData = async ({ url, message, token }) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const { data } = await axios.delete(url, { headers });
    toast.success(message);
    return data;
  } catch (error) {
    const statusCode = error.response?.status || 500; // Default to 500 if no status is available
    const errorBody = error.response?.data?.message || "Something went wrong";

    let message;
    if (typeof errorBody !== "string") {
      message = "Something went wrong";
    } else {
      message = errorBody;
    }

    // Show an error toast
    toast.error(message);

    // Throw an error with both statusCode and message for external handling
    const customError = new Error(errorBody);
    customError.statusCode = statusCode; // Attach statusCode to the error object
    throw customError;
  }
};

export const useDelete = ({ queryKey, url, title, onSuccess }) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteData({ url, title, token }), // Pass showToast to the mutation function
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] }); // Invalidate related queries on success

      if (onSuccess) onSuccess(data, variables);
    },
  });
};
