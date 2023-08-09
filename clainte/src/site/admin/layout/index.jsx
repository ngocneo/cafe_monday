import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { MyProSidebarProvider } from "./SidebarContext";
import Topbar from './Topbar';
import { ColorModeContext, useMode } from '../../../theme';
const Admin = ({ children }) => {
  const [theme, colorMode] = useMode();
  return (

      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <MyProSidebarProvider>
        <div
         style={{
          height: "100%",
          width: "100%",
        }}
        >
      <main>
         <Topbar/>


        {children}
      </main>
      </div>
    </MyProSidebarProvider>
    </ThemeProvider>
    </ColorModeContext.Provider>



  );
};

export default Admin;
