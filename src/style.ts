import { css } from "lit";

export const styles = css`
  :host {
    --mdc-icon-size: 24px;
  }

  .homekit-button-main {
    position: relative;
    display: flex;
    aspect-ratio: 1/1;
    filter: opacity(var(--card-opacity));
  }

  .icon {
    size: 45%;
  }
`;
