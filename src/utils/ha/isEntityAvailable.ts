import { HomeAssistant } from "custom-card-helpers";

export function isEntityAvailable(hass: HomeAssistant, entity: string): boolean {
  if (!hass) {
    return false;
  }

  return entity in hass.states && hass.states[entity].state !== "unavailable" && hass.states[entity].state !== "unknown";
}
