import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/auth.jsx";
import { RestaurantProvider } from "./context/restaurant.jsx";

const queryClient = new QueryClient();

const theme = extendTheme({
  colors: {
    brand: {
      100: "#FF4500",
      200: "#29AB87",
      900: "#FF4500",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <RestaurantProvider>
          <StrictMode>
            <App />
            <ToastContainer />
          </StrictMode>
        </RestaurantProvider>
      </AuthProvider>
    </ChakraProvider>
  </QueryClientProvider>
);
