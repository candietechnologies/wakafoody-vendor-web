import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./auth";

const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [activeRestaurant, setActiveRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const selectRestaurant = (restaurant) => {
    setActiveRestaurant(restaurant);
    localStorage.setItem("restaurant", JSON.stringify(restaurant));
  };

  const clearActiveRestaurant = () => {
    setActiveRestaurant(null);
    localStorage.removeItem("restaurant");
  };

  useEffect(() => {
    const loadRestaurant = () => {
      try {
        const storedRestaurant = localStorage.getItem("restaurant");
        const parsedRestaurant = storedRestaurant
          ? JSON.parse(storedRestaurant)
          : null;

        if (parsedRestaurant) {
          setActiveRestaurant(parsedRestaurant);
        } else if (isAuthenticated) {
          //   navigate("VendorDetails");
        }
      } catch (error) {
        console.error("Failed to load restaurant:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurant();
  }, [isAuthenticated]);

  return (
    <RestaurantContext.Provider
      value={{
        activeRestaurant,
        selectRestaurant,
        clearActiveRestaurant,
      }}>
      {isLoading ? null : children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => useContext(RestaurantContext);
