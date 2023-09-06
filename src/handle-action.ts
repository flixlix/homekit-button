import { ActionConfig, HomeAssistant } from "custom-card-helpers";
import { fireEvent } from "./common/fire-event";
import { HomekitButtonActionConfig } from "./homekit-button-config";

export type ActionConfigParams = {
  entity?: string;
  camera_image?: string;
  hold_action?: HomekitButtonActionConfig;
  tap_action?: HomekitButtonActionConfig;
  double_tap_action?: HomekitButtonActionConfig;
};

export const handleAction = async (node: HTMLElement, _hass: HomeAssistant, config: ActionConfigParams, action: string): Promise<void> => {
  fireEvent(node, "hass-action", { config, action });
};

type ActionParams = { config: ActionConfigParams; action: string };

declare global {
  interface HASSDomEvents {
    "hass-action": ActionParams;
  }
}
