import { mdiGestureTap } from "@mdi/js";

const CUSTOM_ACTIONS = [
  "",
  {
    value: "none",
    label: "None",
  },
  {
    value: "toggle",
    label: "Toggle",
  },
  {
    value: "more-info",
    label: "More Info",
  },
  {
    value: "call-service",
    label: "Call Service",
  },
  {
    value: "url",
    label: "URL",
  },
  {
    value: "navigate",
    label: "Navigate",
  },
  {
    value: "open-dialog",
    label: "Open Dialog",
  },
];

const actionSelector = {
  select: {
    options: CUSTOM_ACTIONS,
    mode: "box",
  },
};

export const actionsSchema = {
  title: "Actions",
  name: "",
  type: "expandable",
  icon: "mdi:gesture-tap",
  schema: [
    {
      name: "tap_action",
      selector: {
        "ui-action": {},
      },
    },
    {
      name: "hold_action",
      selector: {
        "ui-action": {},
      },
    },
    {
      name: "double_tap_action",
      selector: {
        "ui-action": {},
      },
    },
  ],
};
