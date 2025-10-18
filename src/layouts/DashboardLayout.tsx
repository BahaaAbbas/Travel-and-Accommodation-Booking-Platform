import React, { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const DashboardLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const sidebarWidth = sidebarCollapsed ? 60 : 220;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {isMobile && !sidebarOpen && (
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isSidebarOpen={sidebarOpen}
        />
      )}

      {isMobile && sidebarOpen && (
        <>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: sidebarWidth,
              height: "100%",
              bgcolor: "background.paper",
              boxShadow: 3,
              zIndex: 1200,
              transition: "width 0.3s",
            }}
          >
            <Sidebar
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
          </Box>

          <Box
            onClick={() => setSidebarOpen(false)}
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
              zIndex: 1000,
            }}
          />
        </>
      )}

      {!isMobile && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: sidebarWidth,
            height: "100%",
            bgcolor: "background.paper",
            boxShadow: 3,
            transition: "width 0.3s",
          }}
        >
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </Box>
      )}

      {/* main content  */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          m: "0",
          pt: isMobile ? "64px" : 0,
          ml: !isMobile ? `${sidebarWidth}px` : 0,
          transition: "margin-left 0.3s",
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
