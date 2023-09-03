# Homekit Button

A simple Custom Card for Home Assistant to toggle switches, lights &amp; more!
This card focuses on ease of configuration and stability.

To use this card, it is highly recommended to place it inside a grid or stack in order to achieve the sizing to which this card is optimized for.

## Example

This code:

```yaml
type: grid
cards:
  - type: custom:homekit-button
    entity: switch.ac
  - type: custom:homekit-button
    entity: switch.skylight
  - type: custom:homekit-button
    entity: light.bed_light
```

Should give you something like this:

<img width="508" alt="Screenshot 2023-09-03 at 12 47 31" src="examples/01.png">
