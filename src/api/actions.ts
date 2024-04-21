import axios, { AxiosError } from "axios";

const API_URL = "https://vigilant-xylophone-979gx5j9w7j4f7pvw-3000.app.github.dev/api";

export const getAirplaneData = async (year: string): Promise<AirplaneData> => {
  return new Promise<AirplaneData>((resolve, reject) => {
    axios
      .get(`${API_URL}/airplane/${year}`)
      .then((res) => {
        resolve({
          height: res.data.height,
          width: res.data.width,
          length: res.data.length,
          max_speed: res.data.max_speed,
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("Year not found");
          } else {
            // It's a good practice to reject with an Error object
            reject(axiosError.message);
          }
        } else {
          // Handle non-Axios errors
          reject("An unknown error occurred");
        }
      });
  });
};
