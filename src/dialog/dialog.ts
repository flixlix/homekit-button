import { html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators";
import { fireEvent, HomeAssistant } from "custom-card-helpers";
import { haStyleDialog } from "./style";
import { css } from "lit";
import { mdiClose } from "@mdi/js";

declare global {
  interface HASSDomEvents {
    "dialog-closed": any;
  }
}

function provideHass(element) {
  if (document.querySelector("hc-main")) return (document as any).querySelector("hc-main").provideHass(element);

  if (document.querySelector("home-assistant")) return (document as any).querySelector("home-assistant").provideHass(element);
  return undefined;
}

@customElement("homekit-buton-dialog")
export class HomekitButtonDialog extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _params?: any;
  @state() private _card?: any;
  @state() private card?: any;

  async _makeCard() {
    interface CustomWindow extends Window {
      loadCardHelpers?: () => Promise<any>;
    }
    const helpers = await (window as CustomWindow).loadCardHelpers?.();
    this.card = await helpers.createCardElement(this._card);
    provideHass(this.card); // handle updates in states
    this.requestUpdate();
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  public async showDialog(params: any): Promise<void> {
    this._params = params;
    this._card = params.card;
    await this._makeCard();
    await this.updateComplete;
  }

  public closeDialog(): void {
    this._params = undefined;
  }

  protected firstUpdated(changedProps) {
    super.firstUpdated(changedProps);
  }

  protected updated(changedProps): void {
    super.updated(changedProps);

    if (!changedProps.has("_params") || !this._params) {
      return;
    }
  }

  protected render() {
    if (!this._params || !this.card || !this.hass) {
      return nothing;
    }

    const title = this._params.title;

    return html`
      <ha-dialog open @closed=${this.closeDialog} hideActions .heading=${title}>
        <ha-dialog-header class="header-bar" slot="heading">
          <ha-icon-button slot="navigationIcon" dialogAction="cancel" .path=${mdiClose}></ha-icon-button>
          <span slot="title" class="header-title" .title=${title}>${title}</span>
        </ha-dialog-header>
        <div>${this.card}</div>
      </ha-dialog>
    `;
  }

  static styles = [
    css`
      :host {
        display: block;
      }
      :host([show-border]) {
        border-bottom: 1px solid var(--mdc-dialog-scroll-divider-color, rgba(0, 0, 0, 0.12));
      }
      .header-bar {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 4px;
        box-sizing: border-box;
      }
      .header-title {
        flex: 1;
        font-size: 22px;
        line-height: 28px;
        font-weight: 400;
        padding: 10px 4px;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      @media all and (min-width: 450px) and (min-height: 500px) {
        .header-bar {
          padding: 12px;
        }
      }
      .header-navigation-icon {
        flex: none;
        min-width: 8px;
        height: 100%;
        display: flex;
        flex-direction: row;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "homekit-buton-dialog": HomekitButtonDialog;
  }
}
