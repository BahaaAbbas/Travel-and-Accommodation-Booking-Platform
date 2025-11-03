import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Rating,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import adminService from "@/services/adminService";
import searchService from "@/services/searchService";
import type { City } from "@/types/search";
import type { Hotel, Room } from "@/types/HotelTypes";

import StatsPanel from "@/components/StatsPanel";

type TabValue = "cities" | "hotels" | "rooms" | "stats";

const Admin = () => {
  const [activeTab, setActiveTab] = useState<TabValue>("cities");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editItem, setEditItem] = useState<City | Hotel | Room | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });
  const queryClient = useQueryClient();

  const {
    data: cities = [],
    isLoading: citiesLoading,
    error: citiesError,
  } = useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: searchService.getCities,
  });

  const {
    data: hotels = [],
    isLoading: hotelsLoading,
    error: hotelsError,
  } = useQuery<Hotel[]>({
    queryKey: ["hotels"],
    queryFn: searchService.getHotelsOnly,
  });

  const {
    data: rooms = [],
    isLoading: roomsLoading,
    error: roomsError,
  } = useQuery<Room[]>({
    queryKey: ["rooms"],
    queryFn: searchService.getRoomsOnly,
  });

  const createCityMutation = useMutation({
    mutationFn: adminService.postCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      setIsDialogOpen(false);
      setEditItem(null);
    },
  });

  const updateCityMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<City> }) =>
      adminService.putCity(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      setIsDialogOpen(false);
      setEditItem(null);
    },
  });

  const deleteCityMutation = useMutation({
    mutationFn: adminService.deleteCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      setSnackbar({
        open: true,
        message: "City deleted successfully",
        severity: "success",
      });
    },
    onError: () => {
      setSnackbar({
        open: true,
        message: "Failed to delete city",
        severity: "error",
      });
    },
  });

  const createHotelMutation = useMutation({
    mutationFn: adminService.postHotel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hotels"] });
      setIsDialogOpen(false);
      setEditItem(null);
    },
  });

  const updateHotelMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Hotel> }) =>
      adminService.putHotel(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hotels"] });
      setIsDialogOpen(false);
      setEditItem(null);
    },
  });

  const deleteHotelMutation = useMutation({
    mutationFn: adminService.deleteHotel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hotels"] });
      setSnackbar({
        open: true,
        message: "Hotel deleted successfully",
        severity: "success",
      });
    },
    onError: () => {
      setSnackbar({
        open: true,
        message: "Failed to delete hotel",
        severity: "error",
      });
    },
  });

  const createRoomMutation = useMutation({
    mutationFn: adminService.postRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setIsDialogOpen(false);
      setEditItem(null);
    },
  });

  const updateRoomMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Room> }) =>
      adminService.putRoom(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setIsDialogOpen(false);
      setEditItem(null);
    },
  });

  const deleteRoomMutation = useMutation({
    mutationFn: adminService.deleteRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setSnackbar({
        open: true,
        message: "Room deleted successfully",
        severity: "success",
      });
    },
    onError: () => {
      setSnackbar({
        open: true,
        message: "Failed to delete room",
        severity: "error",
      });
    },
  });

  const handleTabChange = (_: React.SyntheticEvent, newValue: TabValue) => {
    setActiveTab(newValue);
  };

  const handleCreateClick = () => {
    if (activeTab === "stats") return;
    setEditItem(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = (item: City | Hotel | Room) => {
    setEditItem(item);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setItemToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete !== null) {
      if (activeTab === "cities") {
        deleteCityMutation.mutate(itemToDelete);
      } else if (activeTab === "hotels") {
        deleteHotelMutation.mutate(itemToDelete);
      } else if (activeTab === "rooms") {
        deleteRoomMutation.mutate(itemToDelete);
      }
      setDeleteConfirmOpen(false);
      setItemToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setItemToDelete(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rawValues = Object.fromEntries(formData.entries());

    const values: Record<string, any> = {};

    for (const key in rawValues) {
      const val = rawValues[key];
      if (typeof val === "string") {
        if (val === "true") values[key] = true;
        else if (val === "false") values[key] = false;
        else if (!isNaN(Number(val)) && val !== "") {
          values[key] = Number(val);
        } else {
          values[key] = val;
        }
      }
    }

    if (activeTab === "cities") {
      if (editItem) {
        const city = editItem as City;
        updateCityMutation.mutate({ id: city.id, data: values });
      } else {
        createCityMutation.mutate(values as Omit<City, "id">);
      }
    } else if (activeTab === "hotels") {
      if (editItem) {
        const hotel = editItem as Hotel;
        updateHotelMutation.mutate({ id: hotel.hotelId, data: values });
      } else {
        createHotelMutation.mutate(values as any);
      }
    } else if (activeTab === "rooms") {
      if (editItem) {
        const room = editItem as Room;
        updateRoomMutation.mutate({ id: room.roomId, data: values });
      } else {
        createRoomMutation.mutate(values as any);
      }
    }
  };

  const filteredCities = cities.filter(
    (city) =>
      city.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.hotelName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (hotel.hotelType
        ? hotel.hotelType.toLowerCase().includes(searchQuery.toLowerCase())
        : false) ||
      hotel.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRooms = rooms.filter((room) =>
    room.roomNumber.toString().includes(searchQuery)
  );

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditItem(null);
  };

  return (
    <Box
      sx={{ minHeight: "100vh", bgcolor: "background.default", py: 6, px: 2 }}
    >
      <Box sx={{ mx: "auto" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h4" fontWeight={600}>
            Admin Panel
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreateClick}
          >
            Create New
          </Button>
        </Stack>

        <TextField
          fullWidth
          variant="outlined"
          label={`Search ${activeTab}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 4 }}
        />

        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Cities" value="cities" sx={{ fontWeight: 600 }} />
          <Tab label="Hotels" value="hotels" sx={{ fontWeight: 600 }} />
          <Tab label="Rooms" value="rooms" sx={{ fontWeight: 600 }} />
          <Tab label="Stats" value="stats" sx={{ fontWeight: 600 }} />
        </Tabs>

        {activeTab === "cities" && (
          <Card>
            <CardHeader
              title="Cities Management"
              titleTypographyProps={{ fontWeight: 600 }}
            />
            <CardContent>
              {citiesLoading ? (
                <Box display="flex" justifyContent="center" p={3}>
                  <CircularProgress />
                </Box>
              ) : citiesError ? (
                <Alert severity="error">Failed to load cities</Alert>
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          Description
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredCities.map((city) => (
                        <TableRow key={city.id}>
                          <TableCell>{city.name}</TableCell>
                          <TableCell>{city.description}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={() => handleEditClick(city)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleDeleteClick(city.id)}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "hotels" && (
          <Card>
            <CardHeader
              title="Hotels Management"
              titleTypographyProps={{ fontWeight: 600 }}
            />
            <CardContent>
              {hotelsLoading ? (
                <Box display="flex" justifyContent="center" p={3}>
                  <CircularProgress />
                </Box>
              ) : hotelsError ? (
                <Alert severity="error">Failed to load hotels</Alert>
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          Star Rating
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          Description
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>latitude</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          longitude
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          Available Rooms
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredHotels.map((hotel) => (
                        <TableRow key={hotel.hotelId}>
                          <TableCell>{hotel.hotelName}</TableCell>
                          <TableCell>
                            <Rating value={hotel.starRating} readOnly />
                          </TableCell>
                          <TableCell>{hotel.location}</TableCell>
                          <TableCell>{hotel.description || "-"}</TableCell>
                          <TableCell>{hotel.hotelType || "-"}</TableCell>
                          <TableCell>{hotel.latitude}</TableCell>
                          <TableCell>{hotel.longitude}</TableCell>
                          <TableCell>{hotel.availableRooms || 0}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={() => handleEditClick(hotel)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleDeleteClick(hotel.hotelId)}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "rooms" && (
          <Card>
            <CardHeader
              title="Rooms Management"
              titleTypographyProps={{ fontWeight: 600 }}
            />
            <CardContent>
              {roomsLoading ? (
                <Box display="flex" justifyContent="center" p={3}>
                  <CircularProgress />
                </Box>
              ) : roomsError ? (
                <Alert severity="error">Failed to load rooms</Alert>
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>
                          Room Number
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          Availability
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Adults</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Children</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Image</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredRooms.map((room) => (
                        <TableRow key={room.roomId}>
                          <TableCell>{room.roomNumber}</TableCell>
                          <TableCell>
                            <Chip
                              label={
                                room.availability ? "Available" : "Unavailable"
                              }
                              color={room.availability ? "success" : "default"}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{room.capacityOfAdults}</TableCell>
                          <TableCell>{room.capacityOfChildren}</TableCell>
                          <TableCell>{room.roomType}</TableCell>
                          <TableCell>
                            {room.roomPhotoUrl ? (
                              <img
                                src={room.roomPhotoUrl}
                                alt={room.roomType}
                                style={{
                                  width: 80,
                                  height: 48,
                                  objectFit: "cover",
                                  borderRadius: 4,
                                }}
                              />
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          <TableCell>{room.price}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={() => handleEditClick(room)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleDeleteClick(room.roomId)}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "stats" && <StatsPanel />}

        {activeTab !== "stats" && (
          <Dialog
            open={isDialogOpen}
            onClose={handleDialogClose}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>
              {editItem
                ? `Edit ${
                    activeTab === "cities"
                      ? "City"
                      : activeTab.slice(0, -1).charAt(0).toUpperCase() +
                        activeTab.slice(1, -1)
                  }`
                : activeTab === "cities"
                ? "Create City"
                : `Create ${
                    activeTab.slice(0, -1).charAt(0).toUpperCase() +
                    activeTab.slice(1, -1)
                  }`}
            </DialogTitle>
            <form onSubmit={handleSubmit}>
              <DialogContent dividers>
                <Stack spacing={2}>
                  {activeTab === "cities" && (
                    <>
                      <TextField
                        label="Name"
                        name="name"
                        required
                        fullWidth
                        defaultValue={editItem ? (editItem as City).name : ""}
                      />
                      <TextField
                        label="Description"
                        name="description"
                        required
                        fullWidth
                        defaultValue={
                          editItem ? (editItem as City).description : ""
                        }
                      />
                    </>
                  )}

                  {activeTab === "hotels" && (
                    <>
                      <TextField
                        label="Hotel Name"
                        name="hotelName"
                        required
                        fullWidth
                        defaultValue={
                          editItem ? (editItem as Hotel).hotelName : ""
                        }
                      />
                      <TextField
                        label="Location"
                        name="location"
                        required
                        fullWidth
                        defaultValue={
                          editItem ? (editItem as Hotel).location : ""
                        }
                      />
                      <TextField
                        label="Description"
                        name="description"
                        fullWidth
                        defaultValue={
                          editItem ? (editItem as Hotel).description || "" : ""
                        }
                      />
                      <TextField
                        label="Hotel Type"
                        name="hotelType"
                        fullWidth
                        defaultValue={
                          editItem ? (editItem as Hotel).hotelType || "" : ""
                        }
                      />
                      <TextField
                        label="Star Rating"
                        name="starRating"
                        type="number"
                        required
                        fullWidth
                        inputProps={{ min: 1, max: 5 }}
                        defaultValue={
                          editItem ? (editItem as Hotel).starRating : ""
                        }
                      />
                      <TextField
                        label="Latitude"
                        name="latitude"
                        type="number"
                        required
                        fullWidth
                        defaultValue={
                          editItem ? (editItem as Hotel).latitude : ""
                        }
                      />
                      <TextField
                        label="Longitude"
                        name="longitude"
                        type="number"
                        required
                        fullWidth
                        defaultValue={
                          editItem ? (editItem as Hotel).longitude : ""
                        }
                      />
                      <TextField
                        label="Room Avilable"
                        name="availableRooms"
                        required
                        fullWidth
                        type="number"
                        defaultValue={
                          editItem ? (editItem as Hotel).availableRooms : ""
                        }
                      />
                    </>
                  )}

                  {activeTab === "rooms" && (
                    <>
                      <TextField
                        label="Room Number"
                        name="roomNumber"
                        type="number"
                        required
                        fullWidth
                        defaultValue={
                          editItem ? (editItem as Room).roomNumber : ""
                        }
                      />
                      <TextField
                        select
                        label="Availability"
                        name="availability"
                        required
                        fullWidth
                        SelectProps={{ native: true }}
                        defaultValue={
                          editItem
                            ? (editItem as Room).availability
                              ? "true"
                              : "false"
                            : "true"
                        }
                      >
                        <option value="true">Available</option>
                        <option value="false">Unavailable</option>
                      </TextField>
                      <TextField
                        label="Room Type"
                        name="roomType"
                        required
                        fullWidth
                        defaultValue={
                          editItem ? (editItem as Room).roomType : ""
                        }
                      />
                      <TextField
                        label="Adult Capacity"
                        name="capacityOfAdults"
                        type="number"
                        required
                        fullWidth
                        inputProps={{ min: 1 }}
                        defaultValue={
                          editItem ? (editItem as Room).capacityOfAdults : ""
                        }
                      />
                      <TextField
                        label="Children Capacity"
                        name="capacityOfChildren"
                        type="number"
                        required
                        fullWidth
                        inputProps={{ min: 0 }}
                        defaultValue={
                          editItem ? (editItem as Room).capacityOfChildren : ""
                        }
                      />
                      <TextField
                        label="Room Photo URL"
                        name="roomPhotoUrl"
                        type="text"
                        required
                        fullWidth
                        defaultValue={
                          editItem ? (editItem as Room).roomPhotoUrl : ""
                        }
                      />
                      <TextField
                        label="Price"
                        name="price"
                        type="number"
                        required
                        fullWidth
                        inputProps={{ min: 0, step: 0.01 }}
                        defaultValue={editItem ? (editItem as Room).price : ""}
                      />
                    </>
                  )}
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button type="submit" variant="contained">
                  {editItem ? "Update" : "Create"}
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        )}

        <Dialog
          open={deleteConfirmOpen}
          onClose={handleCancelDelete}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this {activeTab.slice(0, -1)}?
              This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete}>Cancel</Button>
            <Button
              onClick={handleConfirmDelete}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity={snackbar.severity}
            onClose={handleSnackbarClose}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Admin;
