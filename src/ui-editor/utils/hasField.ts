import { HomekitButtonConfig } from "../../homekit-button-config";

export const hasField = (config: HomekitButtonConfig, fieldName?: "top" | "bottom") => {
  if (!config) return false;
  if (!fieldName)
    if (config.entity) return true;
    else return false;

  if (config?.secondary?.[fieldName]?.entity) return true;
  return false;
};
