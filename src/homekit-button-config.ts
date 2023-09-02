interface LovelaceCardConfig {
  index?: number;
  view_index?: number;
  type: string;
}

export interface HomekitButtonConfig extends LovelaceCardConfig {
  entity: string;
  title?: string;
}
