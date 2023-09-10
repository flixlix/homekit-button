import { mdiInformationOutline } from "@mdi/js";
import { humanizeString } from "../../utils/humanize_string";

const secondaryFieldSchema = (fieldName: string) => ({
  title: humanizeString(fieldName),
  name: fieldName,
  type: "expandable",
  schema: [
    { name: "entity", selector: { entity: {} } },
    { name: "icon", selector: { icon: {} } },
    { name: "show_unit", selector: { boolean: {} } },
  ],
});

export const secondarySchema = {
  title: "Secondary",
  name: "secondary",
  type: "expandable",
  iconPath: mdiInformationOutline,
  schema: [secondaryFieldSchema("top"), secondaryFieldSchema("bottom")],
};
