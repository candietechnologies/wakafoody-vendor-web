import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";

const postData = async ({
  url,
  body,
  message,
  token,
  contentType = "application/json",
  authorization,
  logout,
}) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": contentType,
    Authorization: authorization || `Bearer ${token}`,
  };

  try {
    const { data } = await axios.post(url, body, { headers });
    toast.success(message);
    return data;
  } catch (error) {
    const statusCode = error.response?.status || 500; // Default to 500 if no status is available
    const errorBody = error.response?.data?.message || "Something went wrong";
    if (errorBody.toLowerCase() === "unauthenticated") logout();
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

export const usePost = ({
  queryKey,
  url,
  title,
  onSuccess,
  onError,
  contentType,
  authorization,
}) => {
  const { token, logout } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body) =>
      postData({
        url,
        body,
        title,
        token,
        contentType,
        authorization,
        logout,
      }),
    onSuccess: (data, variables) => {
      onSuccess(data, variables);

      // Invalidate related queries on success
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
    onError: (error, variables) => {
      const statusCode = error.statusCode || "Unknown";
      const errorMessage = error.message || "An error occurred";

      if (onError) {
        onError({ statusCode, message: errorMessage }, variables);
      }
    },
  });
};
