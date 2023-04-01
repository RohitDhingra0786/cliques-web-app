import AppConfigs from "configs";
import { toast } from "react-toastify";

export const getImageUrl = (path) => {
  if (!path) return "";
  return AppConfigs.imageBaseUrl + path;
};

export const getAudioUrl = (path) => {
  if (!path) return "";
  return AppConfigs.audioBaseUrl + path;
};

export const showError = (message) => {
  toast(message, { type: "error" });
};
