import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

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
  <ChakraProvider theme={theme}>
    <StrictMode>
      <App />
    </StrictMode>
  </ChakraProvider>
);
