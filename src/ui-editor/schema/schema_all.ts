import { any, assign, boolean, integer, number, object, optional, record, string } from "superstruct";
import { actionConfigStruct } from "./actionStruct";
import { secondarySchema } from "./secondary";
import { actionsSchema } from "./actions";
import { stateLabelSchema } from "./stateLabel";
import { appearanceSchema } from "./appearance";
import { HomekitButtonConfig } from "../../homekit-button-config";
import { HomeAssistant } from "custom-card-helpers";
import memoizeOne from "memoize-one";
import { hasField } from "../utils/hasField";

const baseLovelaceCardConfig = object({
  type: string(),
  view_index: optional(integer()),
  view_layout: any(),
  index: optional(integer()),
});

const secondaryFieldStruct = optional(
  object({
    entity: string(),
    name: optional(string()),
    icon: optional(string()),
    show_unit: optional(boolean()),
    tap_action: optional(actionConfigStruct),
    hold_action: optional(actionConfigStruct),
    double_tap_action: optional(actionConfigStruct),
  })
);

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

const expandablesSchema = (config: HomekitButtonConfig) => [appearanceSchema, actionsSchema, secondarySchema(config), stateLabelSchema];

const conditionalSchema = (config: HomekitButtonConfig) => (hasField(config) ? ([...expandablesSchema(config)] as const) : []);

export const configSchema = memoizeOne(
  (config: HomekitButtonConfig) => [{ name: "entity", selector: { entity: {} } }, ...conditionalSchema(config)] as const
);
