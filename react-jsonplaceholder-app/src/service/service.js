import axios from "axios";

const apiUrl = "https://jsonplaceholder.typicode.com";

export const fetchUser = async () => {
  try {
    const response = await axios.get(`${apiUrl}/users`);
    return response.data;
  } catch (error) {
    console.log("Get data error: " + error);
  }
};

export const fetchUserDetail = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/users/${id}`);
    return response.data;
  } catch (error) {
    console.log("Get data error: " + error);
  }
};

export const fetchUserAlbum = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/users/${id}/albums`);
    return response.data;
  } catch (error) {
    console.log("Get data error: " + error);
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await axios.put(`${apiUrl}/users/${id}`, data);
    return response.data;
  } catch (error) {
    console.log("put data error: " + error);
  }
};

export const createAlbum = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/albums`, { data });
    return response.data;
  } catch (error) {
    console.log("put data error: " + error);
  }
};

export const deleteAlbum = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/albums/${id}`);
    return response.data;
  } catch (error) {
    console.log("put data error: " + error);
  }
};

export const fetchPhotos = async (start, limit) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.log("put data error: " + error);
  }
};
