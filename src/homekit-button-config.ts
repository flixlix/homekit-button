import {
  BaseActionConfig,
  CallServiceActionConfig,
  CustomActionConfig,
  MoreInfoActionConfig,
  NavigateActionConfig,
  NoActionConfig,
  ToggleActionConfig,
  ToggleMenuActionConfig,
  UrlActionConfig,
} from "custom-card-helpers";

interface LovelaceCardConfig {
  index?: number;
  view_index?: number;
  type: string;
}

interface OpenDialogActionConfig extends BaseActionConfig {
  action: "open-dialog";
  title?: string;
  card: LovelaceCardConfig;
}

export declare type HomekitButtonActionConfig =
  | ToggleActionConfig
  | CallServiceActionConfig
  | NavigateActionConfig
  | UrlActionConfig
  | MoreInfoActionConfig
  | NoActionConfig
  | CustomActionConfig
  | ToggleMenuActionConfig
  | OpenDialogActionConfig;

export interface HomekitButtonConfig extends LovelaceCardConfig {
  entity: string;
  title?: string;
  tap_action?: HomekitButtonActionConfig;
  hold_action?: HomekitButtonActionConfig;
  double_tap_action?: HomekitButtonActionConfig;
  name?: string;
  icon?: string;
  show_state?: boolean;
  active_color?: string;
  dialog_card?: LovelaceCardConfig;
}
