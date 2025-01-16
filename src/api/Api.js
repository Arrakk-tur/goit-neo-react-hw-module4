import axios from "axios";

const API_KEY = "ayMi2jkNhXDz4KlV7QPeQVa32WCfxomnXHouKo4OOdI";
const BASE_URL = "https://api.unsplash.com";

const unsplashAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Client-ID ${API_KEY}`,
  },
});

export const searchPhotos = async (query, page = 1, perPage = 12) => {
  try {
    const response = await unsplashAPI.get("/search/photos", {
      params: {
        query,
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.errors?.[0] || "Failed to fetch photos"
    );
  }
};
