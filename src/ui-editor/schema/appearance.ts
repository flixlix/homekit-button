import { mdiPalette } from "@mdi/js";

export const appearanceSchema = {
  title: "Appearance",
  name: "",
  type: "expandable",
  iconPath: mdiPalette,
  schema: [
    { name: "name", selector: { text: {} } },
    { name: "icon", selector: { icon: {} } },
    { name: "show_state", selector: { boolean: {} } },
  ],
};
