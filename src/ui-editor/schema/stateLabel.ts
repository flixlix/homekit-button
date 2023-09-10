import { mdiLabelOutline } from "@mdi/js";

export const stateLabelSchema = {
  title: "State Label",
  name: "state_label",
  type: "expandable",
  iconPath: mdiLabelOutline,
  schema: [
    { name: "entity", selector: { entity: {} } },
    { name: "humanize", selector: { boolean: {} } },
  ],
};
