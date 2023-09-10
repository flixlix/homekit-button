import { HomeAssistant } from "custom-card-helpers";

export function isEntityOn(hass: HomeAssistant, entity: string): boolean {
  if (!hass) {
    return false;
  }

  return hass.states[entity]?.state === "on";
}
