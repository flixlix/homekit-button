import { HomeAssistant } from "custom-card-helpers";

export function doesEntityExist(hass: HomeAssistant, entity: string): boolean {
  if (!hass) {
    return false;
  }

  return entity in hass.states;
}
