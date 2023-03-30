import AppConfigs from "configs";

export const getImageUrl = (path) => {
  if (!path) return "";
  return AppConfigs.imageBaseUrl + path;
};
