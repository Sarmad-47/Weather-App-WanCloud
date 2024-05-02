import { createContext, useContext, useState } from "react";
const StateContext = createContext();
export  const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#1E4DB7');
  const [activeMenu, setActiveMenu] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('#EAE6FF');
  const [sideBarColor,setSideBarColor]=useState('#CCC2E0');

  return (
    <StateContext.Provider value={{ currentColor, activeMenu,screenSize, setScreenSize, 
     setActiveMenu, setCurrentColor,backgroundColor, setBackgroundColor,sideBarColor,setSideBarColor
     }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);