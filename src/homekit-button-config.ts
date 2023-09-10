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

interface Actions {
  tap_action?: HomekitButtonActionConfig;
  hold_action?: HomekitButtonActionConfig;
  double_tap_action?: HomekitButtonActionConfig;
}

export interface SecondaryField extends Actions {
  entity: string;
  name?: string;
  icon?: string;
  show_unit?: boolean;
}

export interface HomekitButtonConfig extends LovelaceCardConfig, Actions {
  entity: string;
  name?: string;
  icon?: string;
  show_state?: boolean;
  active_color?: string;
  title?: string;
  secondary?: {
    top?: SecondaryField;
    bottom?: SecondaryField;
  };
  state_label?: {
    entity: string;
    humanize?: boolean;
  };
}
