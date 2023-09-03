[![ko-fi support](https://img.shields.io/badge/support-me-ff5e5b?style=flat-square&logo=ko-fi&label=Support%20My%20Work&logo=none)](https://ko-fi.com/flixlix)
![GitHub all releases](https://img.shields.io/github/downloads/flixlix/homekit-button/total?style=flat-square&label=Total%20Downloads)
![commit_activity](https://img.shields.io/github/commit-activity/y/flixlix/homekit-button?color=brightgreen&label=Commits&style=flat-square)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/flixlix/homekit-button?style=flat-square&label=Latest%20Release)

# Homekit Button 🔘

![Homekit Button](examples/title.gif?raw=true "Homekit Button")

A simple Custom Card for Home Assistant to toggle switches, lights &amp; more!
This card focuses on ease of configuration and stability.

To use this card, it is highly recommended to place it inside a grid or stack in order to achieve the sizing to which this card is optimized for.

### 🚨 This card and documentation is still very much a WIP. Check later for installation and usage instructions. ⚠️

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
