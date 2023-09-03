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
    show_name: optional(boolean()),
    icon: optional(string()),
    show_icon: optional(boolean()),
    icon_height: optional(string()),
    tap_action: optional(actionConfigStruct),
    hold_action: optional(actionConfigStruct),
    theme: optional(string()),
    show_state: optional(boolean()),
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
    name: "",
    type: "grid",
    column_min_width: "100px",
    schema: [
      { name: "show_name", selector: { boolean: {} } },
      { name: "show_state", selector: { boolean: {} } },
      { name: "show_icon", selector: { boolean: {} } },
    ],
  },
  {
    name: "",
    type: "grid",
    schema: [
      { name: "icon_height", selector: { text: { suffix: "px" } } },
      { name: "theme", selector: { theme: {} } },
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
] as const;
