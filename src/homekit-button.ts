import { LitElement, PropertyValues, TemplateResult, html } from "lit";
import { customElement, eventOptions, property, queryAsync, state } from "lit/decorators.js";
import { registerCustomCard } from "./utils/register-custom-card";
import { HomeAssistant, handleAction } from "custom-card-helpers";
import { styles } from "./style";
import { HomekitButtonConfig } from "./homekit-button-config";
import { HassEntity } from "home-assistant-js-websocket";
import { Ripple } from "@material/mwc-ripple";
import { RippleHandlers } from "@material/mwc-ripple/ripple-handlers";
import copy from "fast-copy";
import { styleMap } from "lit-html/directives/style-map";
import { actionHandler } from "./action-handler";

registerCustomCard({
  type: "homekit-button",
  name: "Homekit Button",
  description: "A simple homekit-inspired Custom Card for Home Assistant to toggle switches, lights & more!",
});

@customElement("homekit-button")
export class HomekitButton extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config = {} as HomekitButtonConfig;
  @queryAsync("mwc-ripple") private _ripple!: Promise<Ripple | null>;
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

  private _getEntityStateObj(): HassEntity {
    if (!this._config || !this.hass) {
      return {} as HassEntity;
    }
    return this.hass.states[this._config.entity];
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html``;
    }

    const entityObj = this._getEntityStateObj();
    const entityDomain = entityObj.entity_id.split(".")[0];
    const entityIcon = this._config.icon || entityObj.attributes.icon || "mdi:flash";
    const entityName = this._config.name || entityObj.attributes.friendly_name || entityObj.entity_id;
    const entityNameToShow = entityName.charAt(0).toUpperCase() + entityName.slice(1);
    const entityStateToShow = this._config.show_state !== false ? entityObj.state.charAt(0).toUpperCase() + entityObj.state.slice(1) : "";
    const color =
      entityObj.state === "on"
        ? this._config.active_color || "var(--state-light-on-color, var(--state-light-active-color, var(--state-active-color)))"
        : "var(--state-inactive-color)";

    this.style.setProperty("--card-opacity", entityObj.state === "on" ? "1" : "0.5");
    this.style.setProperty("--icon-color", color);

    return html`
      <ha-card
        .header=${this._config.title}
        class="homekit-button-main"
        @action=${this._handleAction}
        @focus="${this.handleRippleFocus}"
        @blur="${this.handleRippleBlur}"
        @mousedown="${this.handleRippleActivate}"
        @mouseup="${this.handleRippleDeactivate}"
        @touchstart="${this.handleRippleActivate}"
        @touchend="${this.handleRippleDeactivate}"
        @touchcancel="${this.handleRippleDeactivate}"
        .actionHandler=${actionHandler({
          hasDoubleClick: this._config?.double_tap_action?.action !== "none",
          hasHold: this._config?.hold_action?.action !== "none",
          repeat: this._config?.hold_action?.repeat,
        })}
        .config="${this._config}"
      >
        <div class="card-content">
        <ha-state-icon
            class="icon"
            id="icon"
            .state=${entityObj}
            ?data-domain=${entityDomain}
            data-state=${entityObj.state}
            .icon="${entityIcon}"

        ></ha-state-icon>
        <div class="text-container">
          <div id="name" style="font-size:17px;">
              ${entityNameToShow}
          </div>
          ${
            this._config.show_state !== false
              ? html` <div id="state" style="color:var(--secondary-text-color);font-size:15px;">${entityStateToShow}</div> `
              : html``
          }
        </div>
        </div>
          <mwc-ripple id="ripple"></mwc-ripple>
        </ha-card>
      </ha-card>
    `;
  }

  private _evalActions(config: HomekitButtonConfig, action: string): HomekitButtonConfig {
    const configDuplicate = copy(config);
    /* eslint no-param-reassign: 0 */
    const __evalObject = (configEval: any): any => {
      if (!configEval) {
        return configEval;
      }
      Object.keys(configEval).forEach((key) => {
        if (typeof configEval[key] === "object") {
          configEval[key] = __evalObject(configEval[key]);
        }
      });
      return configEval;
    };
    if (configDuplicate[action]?.service_data?.entity_id === "entity") {
      configDuplicate[action].service_data.entity_id = config.entity;
    }
    if (configDuplicate[action]?.data?.entity_id === "entity") {
      configDuplicate[action].data.entity_id = config.entity;
    }
    configDuplicate[action] = __evalObject(configDuplicate[action]);
    if (configDuplicate[action]?.entity) {
      configDuplicate.entity = configDuplicate[action].entity;
    }

    return configDuplicate;
  }

  private _rippleHandlers: RippleHandlers = new RippleHandlers(() => {
    // this._shouldRenderRipple = true;
    return this._ripple;
  });

  // backward compatibility
  @eventOptions({ passive: true })
  private handleRippleActivate(evt?: Event): void {
    this._ripple.then((r) => r && typeof r.startPress === "function" && this._rippleHandlers.startPress(evt));
  }

  private handleRippleDeactivate(): void {
    this._ripple.then((r) => r && typeof r.endPress === "function" && this._rippleHandlers.endPress());
  }

  private handleRippleFocus(): void {
    this._ripple.then((r) => r && typeof r.startFocus === "function" && this._rippleHandlers.startFocus());
  }

  private handleRippleBlur(): void {
    this._ripple.then((r) => r && typeof r.endFocus === "function" && this._rippleHandlers.endFocus());
  }

  private _handleAction(ev: any): void {
    if (ev.detail?.action) {
      switch (ev.detail.action) {
        case "tap":
        case "hold":
        case "double_tap":
          const config = this._config;
          if (!config) return;
          const action = ev.detail.action;
          const localAction = this._evalActions(config, `${action}_action`);
          handleAction(this, this.hass!, localAction, action);
          break;
        default:
          break;
      }
    }
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (!this._config || !this.hass) {
      return;
    }
  }

  static styles = styles;
}
