import axios from "./axios";

export const fetcher = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
