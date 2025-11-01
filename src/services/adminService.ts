import type { City } from "@/types/search";
import apiClient from "./apiClient";
import type { Hotel, Room } from "@/types/HotelTypes";
import type { Stats } from "@/types/statsTypes";

export const putCity = async (
  id: number,
  data: Partial<City>
): Promise<City[]> => {
  const res = await apiClient.put(`/cities/${id}`, data);
  return res.data;
};

export const deleteCity = async (id: number): Promise<City[]> => {
  const res = await apiClient.delete(`/cities/${id}`);
  return res.data;
};

export const postCity = async (data: Omit<City, "id">): Promise<City[]> => {
  const res = await apiClient.post("/cities", data);
  return res.data;
};

export const putHotel = async (
  id: number,
  data: Partial<Hotel>
): Promise<Hotel[]> => {
  const res = await apiClient.put(`/hotels/${id}`, data);
  return res.data;
};

export const deleteHotel = async (id: number): Promise<Hotel[]> => {
  const res = await apiClient.delete(`/hotels/${id}`);
  return res.data;
};

export const postHotel = async (data: Omit<Hotel, "id">): Promise<Hotel[]> => {
  const res = await apiClient.post("/hotels", data);
  return res.data;
};

export const putRoom = async (
  id: number,
  data: Partial<Room>
): Promise<Room[]> => {
  const res = await apiClient.put(`/rooms/${id}`, data);
  return res.data;
};

export const deleteRoom = async (id: number): Promise<Room[]> => {
  const res = await apiClient.delete(`/rooms/${id}`);
  return res.data;
};

export const postRoom = async (data: Omit<Room, "id">): Promise<Room[]> => {
  const res = await apiClient.post("/rooms", data);
  return res.data;
};

export const getStats = async (): Promise<Stats> => {
  const res = await apiClient.get("/stats");
  return res.data;
};

const adminService = {
  putCity,
  deleteCity,
  postCity,
  putHotel,
  deleteHotel,
  postHotel,
  putRoom,
  deleteRoom,
  postRoom,
  getStats,
};

export default adminService;
