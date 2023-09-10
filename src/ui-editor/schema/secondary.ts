import { humanizeString } from "../../utils/humanize_string";
import { actionsSchema } from "./actions";
import { HomekitButtonConfig } from "../../homekit-button-config";
import { hasField } from "../utils/hasField";

const secondaryFieldSchema = (fieldName: "top" | "bottom", config: HomekitButtonConfig) => ({
  title: humanizeString(fieldName),
  name: fieldName,
  type: "expandable",
  icon: fieldName === "top" ? "mdi:arrow-up-bold" : "mdi:arrow-down-bold",
  schema: [
    { name: "entity", selector: { entity: {} } },
    ...(hasField(config, fieldName)
      ? [{ name: "icon", selector: { icon: {} } }, { name: "show_unit", selector: { boolean: {} } }, actionsSchema]
      : []),
  ],
});

export const secondarySchema = (config: HomekitButtonConfig) => ({
  title: "Secondary",
  name: "secondary",
  type: "expandable",
  icon: "mdi:information-outline",
  schema: [secondaryFieldSchema("top", config), secondaryFieldSchema("bottom", config)],
});
