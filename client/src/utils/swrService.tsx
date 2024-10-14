import axios from "./axios";

export const fetcher = async (url: string) => {
  try {
    const {
      data: { data, message },
    } = await axios.get(url);
    return { data, message };
  } catch (error) {
    return Promise.reject(error);
  }
};
