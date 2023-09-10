import { HomeAssistant } from "custom-card-helpers";
import { HassEntity } from "home-assistant-js-websocket";
import { doesEntityExist } from "./doesEntityExist";

export function getEntityStateObj(hass: HomeAssistant, entity: string): HassEntity {
  if (!hass) {
    return {} as HassEntity;
  }
  if (!doesEntityExist(hass, entity)) {
    return {
      entity_id: entity,
      state: "unavailable",
      attributes: {},
    } as HassEntity;
  }
  return hass.states[entity];
}
