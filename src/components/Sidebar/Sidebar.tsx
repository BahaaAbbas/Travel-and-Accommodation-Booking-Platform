import { sidebarItems } from "./export";
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Logo from "@/assets/Images/Logo.png";
import {
  DarkMode,
  KeyboardDoubleArrowLeft,
  LightMode,
  Logout,
} from "@mui/icons-material";
import { useThemeContext } from "@/context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import type { SidebarProps } from "@/types/sidebar";

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const { mode, toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType") || "user";

  const filterSidebarItems = sidebarItems.filter((item) => {
    if (item.url === "/admin" && userType !== "Admin") return false;
    return true;
  });

  return (
    <Box
      sx={{
        width: collapsed ? 60 : 220,
        height: "100vh",
        backgroundColor: mode === "dark" ? "#0f172a" : "#ffffff",
        color: mode === "dark" ? "#e2e8f0" : "#1e293b",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all  0.3s ease",
        borderRight:
          mode === "dark" ? "1px solid #1e293b" : "1px solid #e2e8f0",
      }}
    >
      <Box>
        {/* logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            p: 2.5,
            transition: "all 0.3s ease",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={Logo}
            alt="Logo"
            sx={{
              height: 48,
              flexShrink: 0,
              transition: "all 0.3s ease",
            }}
          />
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{
              ml: 0,
              fontSize: "1.2rem",
              background: "linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.5px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              width: collapsed ? 0 : "auto",
              opacity: collapsed ? 0 : 1,
              transition: "all 0.3s ease",
            }}
          >
            TravelBook
          </Typography>
        </Box>

        <Divider
          sx={{
            borderColor: mode === "dark" ? "#1e293b" : "#e2e8f0",
            mb: 1,
          }}
        />

        {/* sidebar items */}
        <List sx={{ mt: 1 }}>
          {filterSidebarItems.map((item) => (
            <Tooltip
              key={item.text}
              title={collapsed ? item.text : ""}
              placement="right-start"
            >
              <ListItemButton
                key={item.text}
                sx={{
                  py: 0.3,
                  px: 0.3,
                  mt: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "8px",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: mode === "dark" ? "#cbd5e1" : "#334155",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor:
                      mode === "dark" ? "rgba(59,130,246,0.1)" : "#f1f5f9",
                    color: mode === "dark" ? "#93c5fd" : "#1e3a8a",
                  },
                }}
                onClick={() => navigate(`${item.url}`)}
              >
                <ListItemIcon
                  sx={{
                    color: mode === "dark" ? "#60a5fa" : "#2563eb",
                    minWidth: 40,
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={item.text}
                    sx={{
                      "& span": {
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        fontFamily: "Inter, Roboto, sans-serif",
                      },
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
      </Box>

      {/* bottom item */}
      <Box>
        <Divider
          sx={{
            borderColor: mode === "dark" ? "#1e293b" : "#e2e8f0",
            mb: 1,
          }}
        />
        <List>
          <ListItemButton
            sx={{
              py: 1.3,
              px: collapsed ? 2 : 2,
              color: mode === "dark" ? "#93c5fd" : "#2563eb",
              "&:hover": {
                backgroundColor:
                  mode === "dark" ? "rgba(59,130,246,0.1)" : "#f1f5f9",
              },
            }}
            onClick={toggleTheme}
          >
            <ListItemIcon
              sx={{
                color: mode === "dark" ? "#60a5fa" : "#2563eb",
                minWidth: 40,
              }}
            >
              {mode === "dark" ? <LightMode /> : <DarkMode />}
            </ListItemIcon>
            {!collapsed && (
              <ListItemText
                primary={mode === "dark" ? "Light Mode" : "Dark Mode"}
                sx={{
                  "& span": {
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    fontFamily: "Inter, Roboto, sans-serif",
                  },
                }}
              />
            )}
          </ListItemButton>

          <ListItemButton
            sx={{
              py: 1.3,
              px: collapsed ? 2 : 2,
              color: mode === "dark" ? "#f87171" : "#dc2626",
              "&:hover": {
                backgroundColor:
                  mode === "dark" ? "rgba(239,68,68,0.1)" : "#fee2e2",
              },
            }}
            onClick={() => {
              navigate(`/login`);
            }}
          >
            <ListItemIcon
              sx={{
                color: mode === "dark" ? "#f87171" : "#dc2626",
                minWidth: 40,
              }}
            >
              <Logout />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText
                primary="Logout"
                sx={{
                  "& span": {
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    fontFamily: "Inter, Roboto, sans-serif",
                  },
                }}
              />
            )}
          </ListItemButton>

          <ListItemButton
            sx={{
              py: 1.3,
              px: collapsed ? 2 : 2,
              "&:hover": {
                backgroundColor:
                  mode === "dark" ? "rgba(148,163,184,0.1)" : "#f1f5f9",
              },
            }}
            onClick={onToggleCollapse}
          >
            <ListItemIcon
              sx={{
                color: mode === "dark" ? "#94a3b8" : "#475569",
                minWidth: 40,
              }}
            >
              <KeyboardDoubleArrowLeft
                sx={{
                  transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s",
                }}
              />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText
                primary="Collapse"
                sx={{
                  "& span": {
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    fontFamily: "Inter, Roboto, sans-serif",
                  },
                }}
              />
            )}
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
