import { ActionConfig } from "custom-card-helpers";

interface LovelaceCardConfig {
  index?: number;
  view_index?: number;
  type: string;
}

export interface HomekitButtonConfig extends LovelaceCardConfig {
  entity: string;
  title?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  name?: string;
  icon?: string;
  show_state?: boolean;
  active_color?: string;
  dialog_card?: LovelaceCardConfig;
}
