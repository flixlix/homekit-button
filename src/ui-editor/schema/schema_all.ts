import { any, assign, boolean, integer, number, object, optional, record, string } from "superstruct";
import { actionConfigStruct } from "./action";

const baseLovelaceCardConfig = object({
  type: string(),
  view_layout: any(),
});

export const cardConfigStruct = assign(
  baseLovelaceCardConfig,
  object({
    entity: optional(string()),
    name: optional(string()),
    icon: optional(string()),
    tap_action: optional(actionConfigStruct),
    hold_action: optional(actionConfigStruct),
    double_tap_action: optional(actionConfigStruct),
  })
);

export const configSchema = [
  { name: "entity", selector: { entity: {} } },
  {
    name: "",
    type: "grid",
    schema: [
      { name: "name", selector: { text: {} } },
      {
        name: "icon",
        selector: {
          icon: {},
        },
        context: {
          icon_entity: "entity",
        },
      },
    ],
  },
  {
    name: "tap_action",
    selector: { "ui-action": {} },
  },
  {
    name: "hold_action",
    selector: { "ui-action": {} },
  },
  {
    name: "double_tap_action",
    selector: { "ui-action": {} },
  },
] as const;
