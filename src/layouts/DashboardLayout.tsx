import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {
  toggleSidebar,
  setSidebarOpen,
  toggleSidebarCollapse,
} from "@/features/layout/layoutSlice";
import { selectLayout } from "@/features/layout/layoutSelectors";
import { useAppDispatch, useAppSelector } from "@/features/hooks";

const DashboardLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useAppDispatch();
  const { sidebarOpen, sidebarCollapsed } = useAppSelector(selectLayout);
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
          onToggleSidebar={() => dispatch(toggleSidebar())}
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
              onToggleCollapse={() => dispatch(toggleSidebarCollapse())}
            />
          </Box>

          <Box
            onClick={() => dispatch(setSidebarOpen(false))}
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
            onToggleCollapse={() => dispatch(toggleSidebarCollapse())}
          />
        </Box>
      )}

      {/* main content  */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          m: 0,
          pt: isMobile ? "45px" : 0,
          ml: !isMobile ? `${sidebarWidth}px` : 0,
          width: !isMobile ? `calc(100% - ${sidebarWidth}px)` : "100%",
          transition: "all 0.3s ease",
          // overflowX: "hidden", // prevent horizontal scrollbar
          bgcolor: theme.palette.background.default,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
