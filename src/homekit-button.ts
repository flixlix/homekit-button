import { LitElement, PropertyValues, TemplateResult, html } from "lit";
import { customElement, eventOptions, property, queryAsync, state } from "lit/decorators.js";
import { registerCustomCard } from "./utils/register-custom-card";
import { ActionConfig, EntityConfig, HomeAssistant, LovelaceCardEditor, handleAction } from "custom-card-helpers";
import { styles } from "./style";
import { HomekitButtonActionConfig, HomekitButtonConfig, SecondaryField } from "./homekit-button-config";
import { HassEntity } from "home-assistant-js-websocket";
import { Ripple } from "@material/mwc-ripple";
import { RippleHandlers } from "@material/mwc-ripple/ripple-handlers";
import copy from "fast-copy";
import { styleMap } from "lit-html/directives/style-map";
import { actionHandler } from "./action-handler";
import "./ui-editor/ui-editor";
import { fireEvent } from "./common/fire-event";
import { humanizeString } from "./utils/humanize_string";
import { getEntityStateObj } from "./utils/ha/getEntityStateObj";
import { isEntityOn } from "./utils/ha/isEntityOn";
import { isEntityAvailable } from "./utils/ha/isEntityAvailable";
import { getFriendlyEntityState } from "./utils/ha/getFriendlyEntityState";
import { doesEntityExist } from "./utils/ha/doesEntityExist";

registerCustomCard({
  type: "homekit-button",
  name: "Homekit Button",
  description: "A simple homekit-inspired Custom Card for Home Assistant to toggle switches, lights & more!",
});

@customElement("homekit-button")
export class HomekitButton extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config = {} as HomekitButtonConfig;
  @state() private _secondaryClicked = false;
  @queryAsync("mwc-ripple") private _ripple!: Promise<Ripple | null>;
  @state() _dialogCard;
  setConfig(config: HomekitButtonConfig): void {
    if (!config.entity) {
      throw new Error("Please define at least one entity");
    }
    this._config = config;
  }

  static getStubConfig(hass: HomeAssistant): object | undefined {
    if (!hass) return {};
    const DEFAULT_CONFIG = {
      entity: "",
      show_state: true,
    };
    const hassEntities = Object.keys(hass.states);
    const switches = hassEntities.filter((eid) => eid.split(".")[0] === "switch");
    const lights = hassEntities.filter((eid) => eid.split(".")[0] === "light");

    if (switches.length > 0) {
      return { ...DEFAULT_CONFIG, entity: switches[0] };
    }

    if (lights.length > 0) {
      return { ...DEFAULT_CONFIG, entity: lights[0] };
    }

    return { ...DEFAULT_CONFIG, entity: hassEntities[0] };
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./ui-editor/ui-editor");
    return document.createElement("homekit-button-editor");
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

  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html``;
    }

    const handleMainAction = (ev: any) => {
      if (!!this._secondaryClicked) return; // Avoid two actions at the same time
      if (!doesEntityExist(this.hass, this._config.entity)) return; // Avoid actions when entity does not exist
      this._handleAction(ev);
    };

    const entityObj = getEntityStateObj(this.hass, this._config.entity);
    const entityDomain = entityObj.entity_id.split(".")[0];
    const entityIcon = this._config.icon || entityObj?.attributes?.icon || "mdi:flash";
    const entityName = this._config.name || entityObj?.attributes?.friendly_name || entityObj.entity_id;
    const entityNameToShow = humanizeString(entityName);

    const entityOn = isEntityOn(this.hass, this._config.entity);
    const entityAvailable = isEntityAvailable(this.hass, this._config.entity);

    const color = entityOn
      ? this._config.active_color || "var(--state-light-on-color, var(--state-light-active-color, var(--state-active-color)))"
      : "var(--state-inactive-color)";

    this.style.setProperty("--card-opacity", entityOn ? "1" : entityAvailable ? "0.5" : "0.25");
    this.style.setProperty("--icon-color", color);

    const getSecondaryStateToShow = (fieldName: "top" | "bottom") => {
      const field = this._config.secondary?.[fieldName];
      if (!field) return "";
      return getFriendlyEntityState(this.hass, field.entity, {
        showUnit: field.show_unit !== false,
      });
    };

    const secondaryElement = (fieldName: "top" | "bottom") => {
      const field = this._config.secondary?.[fieldName];
      if (!field || !field?.entity) return html``;
      const handleClick = (ev: any) => {
        this._secondaryClicked = true;
        this._handleAction(ev, field);
        setTimeout(() => {
          this._secondaryClicked = false;
        }); // Avoid setting false directly
      };
      const icon = field.icon ? html` <ha-icon class="secondary-icon" id="icon" .icon="${field.icon}"></ha-icon> ` : html``;
      return html` <p class=${`secondary-text-` + fieldName} @action=${handleClick}>${icon}${getSecondaryStateToShow(fieldName)}</p> `;
    };

    const stateElement = () => {
      if (this._config.show_state === false) return html``;

      let label = "";

      if (this._config?.state_label?.entity) {
        const humanize = this._config?.state_label?.humanize !== false;
        const humanizedState = getFriendlyEntityState(this.hass, this._config.state_label.entity, {
          showUnit: false,
        });
        label = humanize ? humanizedState : getEntityStateObj(this.hass, this._config.state_label.entity)?.state;
      } else {
        label = getFriendlyEntityState(this.hass, this._config.entity);
      }
      return html` <p id="state">${label}</p> `;
    };

    return html`
      <ha-card
        .header=${this._config.title}
        class="homekit-button-main"
        @action=${handleMainAction}
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
            <div class="top-container">
              <p id="name">
                ${entityNameToShow}
              </p>
              ${secondaryElement("top")}
            </div>
            <div class="bottom-container">
              ${stateElement()}
              ${secondaryElement("bottom")}
          </div>
          </div>

        </div>
          <mwc-ripple id="ripple"></mwc-ripple>
        </ha-card>
      </ha-card>
    `;
  }

  private _evalActions(config: HomekitButtonConfig | SecondaryField, action: string): HomekitButtonConfig | SecondaryField {
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

  private _handleAction(ev: any, configLocation: HomekitButtonConfig | SecondaryField = this._config): void {
    if (ev.detail?.action) {
      switch (ev.detail.action) {
        case "tap":
        case "hold":
        case "double_tap":
          const config = configLocation;
          if (!config) return;
          const action = ev.detail.action;
          const localAction = this._evalActions(config, `${action}_action`);
          if (localAction[action + "_action"]?.action === "open-dialog") {
            const entityObj = getEntityStateObj(this.hass, configLocation.entity);
            const entityName = configLocation?.name || entityObj.attributes.friendly_name || entityObj.entity_id;
            const entityNameToShow = entityName.charAt(0).toUpperCase() + entityName.slice(1);
            fireEvent(this, "show-dialog", {
              dialogTag: "homekit-buton-dialog",
              dialogImport: () => import("./dialog/dialog"),
              dialogParams: {
                title: localAction[action + "_action"].title || entityNameToShow,
                card: localAction[action + "_action"].card,
                hass: this.hass,
              },
            });
            break;
          }
          handleAction(
            this,
            this.hass!,
            localAction as {
              entity?: string;
              camera_image?: string;
              hold_action?: ActionConfig;
              tap_action?: ActionConfig;
              double_tap_action?: ActionConfig;
            },
            action
          );
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
