import { mdiGestureTap } from "@mdi/js";

const CUSTOM_ACTIONS = ["none", "toggle", "more-info", "call-service", "url", "navigate", "open-dialog"];

export const actionsSchema = {
  title: "Actions",
  name: "actions",
  type: "expandable",
  iconPath: mdiGestureTap,
  schema: [
    {
      name: "tap_action",
      selector: {
        "ui-action": {
          actions: CUSTOM_ACTIONS,
        },
      },
    },
    {
      name: "hold_action",
      selector: {
        "ui-action": {
          actions: CUSTOM_ACTIONS,
        },
      },
    },
    {
      name: "double_tap_action",
      selector: {
        "ui-action": {
          actions: CUSTOM_ACTIONS,
        },
      },
    },
  ],
};
