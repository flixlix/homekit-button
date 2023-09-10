import { css } from "lit";

export const styles = css`
  * {
    box-sizing: border-box;
  }

  .homekit-button-main {
    aspect-ratio: 1/1;
    filter: opacity(var(--card-opacity));
  }
  .card-content {
    height: 100%;
    width: 100%;
    padding: 0.5rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  ha-card {
    cursor: pointer;
  }

  :not(ha-state-icon) ha-icon,
  ha-state-icon {
    margin: auto;
    --mdc-icon-size: 100%;
    color: var(--icon-color);
  }

  ha-state-icon#icon {
    height: 45%;
  }

  p {
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  #name {
    font-size: 17px;
  }

  #state {
    color: var(--secondary-text-color);
    font-size: 15px;
  }

  .text-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 0.25rem;
  }

  .text-container > * {
    padding: 0 0.75rem;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 0.5rem;
  }

  .secondary-text {
    font-size: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
  }

  .secondary-icon {
    --mdc-icon-size: 14px;
  }

  .secondary-text-bottom {
    color: var(--secondary-text-color);
  }
`;
