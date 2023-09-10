import { HomeAssistant } from "custom-card-helpers";
import { humanizeString } from "../humanize_string";
import { getEntityStateObj } from "./getEntityStateObj";

export function getFriendlyEntityState(
  hass: HomeAssistant,
  entity: string,
  options?: {
    showUnit?: boolean;
    unitWhitespace?: boolean;
  }
): string {
  if (!hass) {
    return "";
  }
  let state: string = getEntityStateObj(hass, entity).state;

  if (!isNaN(Number(state))) {
    const decimals = 0;
    state = Number(state).toFixed(decimals);
  } else {
    state = humanizeString(state);
  }

  if (options?.showUnit !== true) return state;

  const unit = hass.states[entity]?.attributes.unit_of_measurement || "";
  const spaceChar = options?.unitWhitespace !== false ? "\u200A" : "";
  return state + spaceChar + unit;
}
