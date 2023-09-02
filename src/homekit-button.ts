import { LitElement, PropertyValues, TemplateResult, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { registerCustomCard } from "./utils/register-custom-card";
import { HomeAssistant } from "custom-card-helpers";
import { styles } from "./style";
import { HomekitButtonConfig } from "./homekit-button-config";
import { HassEntity } from "home-assistant-js-websocket";

registerCustomCard({
  type: "homekit-button",
  name: "Homekit Button",
  description: "A simple homekit-inspired Custom Card for Home Assistant to toggle switches, lights & more!",
});

@customElement("homekit-button")
export class HomekitButton extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config = {} as HomekitButtonConfig; // TODO type
  setConfig(config: HomekitButtonConfig): void {
    if (!config.entity) {
      throw new Error("Please define at least one entity");
    }
    this._config = config;
  }

  public connectedCallback() {
    super.connectedCallback();
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
  }

  public getCardSize(): Promise<number> | number {
    return 2;
  }

  private getEntityState(): HassEntity {
    if (!this._config || !this.hass) {
      return {} as HassEntity;
    }
    const entityState = this.hass.states[this._config.entity];
    return entityState;
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html``;
    }

    const entityState = this.getEntityState();
    
    this.style.setProperty("--card-opacity", entityState.state === "on" ? "1" : "0.5");

    return html`
      <ha-card
        .header=${this._config.title}
        class="homekit-button-main"
      >
        <div class="card-content">
        <ha-state-icon
            class="icon"    
            .state=${entityState}
            ?data-domain=${"light"}
            data-state=${entityState.state}
            .icon="${"mdi:lightbulb"}"
            
        ></ha-state-icon>
        <div id="name" class="ellipsis" style="justify-self:start;font-size:17px;padding-left:10px;">
            Heat Pump
        </div>
    
        <div id="state" class="ellipsis" style="color:var(--secondary-text-color);justify-self:start;font-size:15px;padding-left:10px;">
            Off
        </div>
        </div>
          <mwc-ripple id="ripple"></mwc-ripple>
        </ha-card>
      </ha-card>
    `;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (!this._config || !this.hass) {
      return;
    }
  }

  static styles = styles;
}
