import axios from "axios";
import AppConfigs from "configs";
import store from "redux/store";

const checkStatus = (status) => status >= 200 && status < 300;

export const apiRootLive = AppConfigs.baseUrl;

const client = axios.create({
  baseURL: AppConfigs.isProduction ? AppConfigs.baseUrl : AppConfigs.stagingUrl,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    "Content-Type": "multipart/form-data",
    // 'Cache-Control': 'no-cache',
  },
  validateStatus: checkStatus,
});

// Add token for every request if provided
client.interceptors.request.use(
  async function (config) {
    const state = store.getState();
    const token = state.auth?.token || null;

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (
      response.data?.success == "false" &&
      response.data?.msg?.includes("No User Found")
    ) {
    }
    return response;
  },
  function (error) {
    console.log("errrrrrrrrr", error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return Promise.reject(error?.response || error);
  }
);

export { client };
