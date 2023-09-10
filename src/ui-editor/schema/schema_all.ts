import { any, assign, boolean, integer, number, object, optional, record, string } from "superstruct";
import { actionConfigStruct } from "./actionStruct";
import { secondarySchema } from "./secondary";
import { actionsSchema } from "./actions";
import { stateLabelSchema } from "./stateLabel";
import { appearanceSchema } from "./appearance";

const baseLovelaceCardConfig = object({
  type: string(),
  view_index: optional(integer()),
  view_layout: any(),
  index: optional(integer()),
});

const secondaryFieldStruct = object({
  entity: string(),
  name: optional(string()),
  icon: optional(string()),
  show_unit: optional(boolean()),
  tap_action: optional(actionConfigStruct),
  hold_action: optional(actionConfigStruct),
  double_tap_action: optional(actionConfigStruct),
});

export const cardConfigStruct = assign(
  baseLovelaceCardConfig,
  object({
    entity: optional(string()),
    name: optional(string()),
    icon: optional(string()),
    show_state: optional(boolean()),
    active_color: optional(string()),
    title: optional(string()),
    secondary: optional(
      object({
        top: secondaryFieldStruct,
        bottom: secondaryFieldStruct,
      })
    ),
    state_label: optional(
      object({
        entity: string(),
        humanize: optional(boolean()),
      })
    ),
    tap_action: optional(actionConfigStruct),
    hold_action: optional(actionConfigStruct),
    double_tap_action: optional(actionConfigStruct),
  })
);

export const configSchema = [{ name: "entity", selector: { entity: {} } }, appearanceSchema, actionsSchema, secondarySchema, stateLabelSchema] as const;
