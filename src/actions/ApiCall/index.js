import axios from "axios";
import { API_ROOT } from "utilities/constants";

//Update Board
export const updateBoard = async (id, data) => {
  const request = await axios.put(`${API_ROOT}/v1/boards/${id}`, data);
  return request.data;
};
//fect data api from firebase to web
export const fetchBoardDetails = async (id) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${id}`);
  return request.data;
};
//Create New Column
export const createNewColumn = async (data) => {
  const request = await axios.post(`${API_ROOT}/v1/columns`, data);
  return request.data;
};

//Update or Remove Column
export const updateColumn = async (id, data) => {
  const request = await axios.put(`${API_ROOT}/v1/columns/${id}`, data);
  return request.data;
};
//Create New Card
export const createNewCard = async (data) => {
  const request = await axios.post(`${API_ROOT}/v1/cards`, data);
  return request.data;
};

//Update or Remove Card
export const updateCard = async (id, data) => {
  const request = await axios.put(`${API_ROOT}/v1/cards/${id}`, data);
  return request.data;
};
