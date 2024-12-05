import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../backend-functions/account";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  // Function to add a new community
//   const addCommunity = (newCommunity) => {
//     setCommunities((prevCommunities) => [...prevCommunities, newCommunity]);
//   };

//   const removeCommunity = (communityId) => {
//     setCommunities((prevCommunities) =>
//       prevCommunities.filter((community) => community.$id !== communityId)
//     );
//   };

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        // communities,
        // setCommunities,
        // addCommunity, // Expose the addCommunity function
        // removeCommunity,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
