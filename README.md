# Homekit Button

[![ko-fi support](https://img.shields.io/badge/support-me-ff5e5b?style=flat-square&logo=ko-fi&label=Support%20My%20Work&logo=none)](https://ko-fi.com/flixlix)
![GitHub all releases](https://img.shields.io/github/downloads/flixlix/homekit-button/total?style=flat-square&label=Total%20Downloads)
![commit_activity](https://img.shields.io/github/commit-activity/y/flixlix/homekit-button?color=brightgreen&label=Commits&style=flat-square)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/flixlix/homekit-button?style=flat-square&label=Latest%20Release)

![Homekit Button](examples/title.gif?raw=true "Homekit Button")

A simple Custom Card for [Home Assistant](https://www.home-assistant.io) to toggle switches, lights &amp; more!
This card focuses on ease of configuration and stability.

To use this card, it is highly recommended to place it inside a grid or stack in order to achieve the sizing to which this card is optimized for.

## Features

- Stability! 🦾
- Clean Design (Fits well with HA design-language) ✨
- Ui Editor 🚀
- Custom Dialog with configurable cards ⚡️

## Installation

0. Before starting, make sure, advanced mode is enabled in your user profile (click on your user avatar in the sidebar to enable it). Also make sure you have [HACS](https://hacs.xyz) installed.
1. Navigate to HACS
2. Go to "Frontend"
3. Click the ⠇button in the top right corner and select "Custom Repositories"
4. Copy this Repo's link (`https://github.com/flixlix/homekit-button`)
5. Under "Category", select "Frontend"
6. The card should now be found and able to be easily installed through the UI 🥳

## UI Editor

This card features a fully featured UI Editor (except [`open-dialog` action](#open-dialog-action)), so in most cases you won't need to edit any YAML.

![UI Editor](examples/ui-editor.png?raw=true "UI Editor")

## Configuration

To start using this card, you can simply create a new Card in your Lovelace dashboard and select "HomeKit Button" in the card type picker.

This card features an (almost) fully functional UI Editor, so in most cases you won't need to edit any YAML.

The following options are available from the YAML configuration.

| Option              | Default                     | Required | Description                                                                                                          |
| ------------------- | --------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `entity`            | undefined                   | ✅       | The main entity to be displayed.                                                                                     |
| `name`              | Name of the entity          |          | The name to be shown for the card.                                                                                   |
| `icon`              | Icon of the entity          |          | The icon to be shown in the card.                                                                                    |
| `show_state`        | true                        |          | Wether to show the "On" / "Off" Labels in the card.                                                                  |
| `active_color`      | var(--state-light-on-color) |          | A css recognisable color (HEX, Color Name or variable) to change the icon to when the entity is in its active state. |
| `tap_action`        | more-info                   |          | The action to call when tapping the card. See [Action Object](#action-object) for more info.                         |
| `hold_action`       | more-info                   |          | The action to call when holding the card. See [Action Object](#action-object) for more info.                         |
| `double_tap_action` | more-info                   |          | The action to call when double-tapping the card. See [Action Object](#action-object) for more info.                  |
| `title`             | none                        |          | The title to show above the card (not recommended).                                                                  |
| `secondary`         | none                        |          | The secondary text to show next to the state. See [Secondary](#secondary-configuration) for more info.               |
| `state_label`       | none                        |          | Override the state label. See [State Label](#state-label-configuration) for more info.                               |

### Action Object

The action object is a simple object that can be used to call different actions when interacting with the card. The following options are available:

| Option            | Default | Required | Description                                                                                                                                                |
| ----------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `action`          | none    | ✅       | The action to call. Choose between `none`, `more-info`, `toggle`, `call-service`, `navigate`, `url` or **exclusive** [`open-dialog`](#open-dialog-action). |
| `service`         | none    |          | The service to call when `action` is set to `call-service`.                                                                                                |
| `service_data`    | none    |          | The service data to pass to the service when `action` is set to `call-service`.                                                                            |
| `navigation_path` | none    |          | The path to navigate to when `action` is set to `navigate`.                                                                                                |
| `url_path`        | none    |          | The url to navigate to when `action` is set to `url`.                                                                                                      |
| `card`            | none    |          | The card to show when `action` is set to `open-dialog`. See [Dialog Cards](#open-dialog-action) for more info.                                             |
| `title`           | none    |          | The title of the Dialog Header to show when `action` is set to `open-dialog`.                                                                              |

#### Open Dialog Action

The `open-dialog` action is a special action, exclusive to this card. It allows you to open a dialog with a custom card inside of it. This can be used to show a more detailed view of the entity, or to show a different card when tapping the button.

When using this action, the `card` option is required. The Header of the Dialog uses the optional `title` option, and will default to the `name` of the entity.

Note that this option is only available when using the YAML configuration.

### Secondary Configuration

With the secondary configuration, you can add a secondary text to the card. This can be used to show the current temperature of a thermostat, or the current brightness of a light, for example. Also supports [Actions](#action-object).

| Option   | Default | Required | Description                                            |
| -------- | ------- | -------- | ------------------------------------------------------ |
| `top`    | none    |          | See [Secondary Field](#secondary-field) for more info. |
| `bottom` | none    |          | See [Secondary Field](#secondary-field) for more info. |

#### Secondary Field

Options for the secondary field.

| Option              | Default   | Required | Description                                                                                         |
| ------------------- | --------- | -------- | --------------------------------------------------------------------------------------------------- |
| `entity`            | none      | ✅       | The entity to show the state of.                                                                    |
| `icon`              | none      |          | The icon to show next to the state of this secondary field.                                         |
| `show_unit`         | true      |          | Wether to show the unit of the entity.                                                              |
| `tap_action`        | more-info |          | The action to call when tapping the card. See [Action Object](#action-object) for more info.        |
| `hold_action`       | more-info |          | The action to call when holding the card. See [Action Object](#action-object) for more info.        |
| `double_tap_action` | more-info |          | The action to call when double-tapping the card. See [Action Object](#action-object) for more info. |

### State Label Configuration

With the state label configuration, you can decide how the state is displayed. Note that this does not affect the state of the entity, or the way the card handles state changes. This is purely for text display purposes.

| Option     | Default | Required | Description                                                                                                                                              |
| ---------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity`   | none    | ✅       | The entity to show the state of. Most likely will be a `input_text` that is updated by an automation.                                                    |
| `humanize` | true    |          | Wether to humanize the state. For example, `on_running` will be displayed as `On running`. If set to `false`, the state will be displayed exactly as is. |

## Basic Example

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

![Basic Example](examples/simple.png?raw=true "Basic Example")

## Using Open Dialog Action

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
    tap_action:
      action: open-dialog
      card:
        type: entities
        entities:
          - entity: switch.ac
          - entity: switch.skylight
          - entity: light.bed_light
```

Should not differ from the previous example, but when tapping the last card, it should open a dialog with the entities inside of it.

![Open Dialog Example](examples/open-dialog-action.png?raw=true "Open Dialog Example")

## Advanced Example

This code:

```yaml
square: false
columns: 3
type: grid
title: Homekit Button
cards:
  - type: custom:homekit-button
    entity: switch.acj
    name: Homekit Button
    icon: mdi:radiobox-marked
    tap_action:
      action: toggle
  - type: custom:homekit-button
    entity: switch.skylight
    icon: mdi:window-open-variant
    tap_action:
      action: open-dialog
      title: My Custom Dialog
      card:
        type: custom:homekit-button
        entity: switch.skylight
        icon: mdi:window-open-variant
        tap_action:
          action: toggle
  - type: custom:homekit-button
    entity: light.bed_light
    icon: mdi:lightbulb
    show_state: false
    tap_action:
      action: toggle
  - type: custom:homekit-button
    entity: switch.computer
    tap_action:
      action: toggle
    hold_action:
      action: toggle
    icon: mdi:chip
    name: Computer
    show_state: false
    secondary:
      top:
        entity: sensor.cpu_percent
  - type: custom:homekit-button
    entity: switch.heat_pump
    tap_action:
      action: toggle
    hold_action:
      action: toggle
    icon: mdi:water-boiler
    name: Heat Pump
    secondary:
      top:
        entity: number.temperature_setting
        tap_action:
          action: open-dialog
          card:
            type: custom:homekit-button
            entity: light.bed_light
            icon: mdi:lightbulb
            show_state: false
            tap_action:
              action: toggle
      bottom:
        entity: sensor.outside_temperature
        icon: mdi:thermometer-chevron-up
  - type: custom:homekit-button
    entity: light.ceiling_lights
    icon: mdi:light-recessed
    state_label:
      entity: input_text.custom_label
    tap_action:
      action: toggle
```

Should give you something like this:

![Advanced Example](examples/advanced.png?raw=true "Advanced Example")

### Top Left Card - Card Not in HA

This card is how the card looks when the entity is not even in your Home Assistant instance. This is to prevent the card from breaking when the entity is not available.

### Top Middle Card - Normal `off` State & Open Dialog Action

This card is how the card looks when the entity is in its `off` state. The icon is greyed out, and the state is shown as `Off`. Also note that this card has the tap_action set to `open-dialog`, which opens a dialog with, in this case, the same card inside of it.

### Top Right Card - State Hidden

This card is how the card looks when the `show_state` option is set to `false` and the entity is off. The icon is still greyed out, but the state is not shown.

### Bottom Left Card - `on` State with State hidden and Top Secondary

This card is how the card looks when the entity is in its `on` state, and the `show_state` option is set to `false`. The icon is shown as active, but the state is not shown. Also note that this card has a secondary field on the top, which shows the current CPU usage.

### Bottom Middle Card - Both Secondaries

Note that this card has both secondary fields, one on the top and one on the bottom. The Bottom secondary field also has a custom icon.

### Bottom Right Card - Custom State Label

This card has a custom state label, which is an `input_text` that is updated by an automation. The state label is shown as `Custom label (❄️)`, which is the humanized version of the state.

## Contributing

If you have any ideas for new features, or find any bugs, feel free to open an issue or a pull request!

This card is developed using [Visual Studio Code](https://code.visualstudio.com) with [devcontainer](https://code.visualstudio.com/docs/remote/containers) support.
To get started, simply open the project in VSCode and run the "Reopen in Container" command.
This will automatically start a Home Assistant instance with the card installed and ready to be used.
In a browser, navigate to `http://localhost:9123` to access the Home Assistant instance.
You can now start developing!

## Support

If you like my work, consider supporting me on [Ko-Fi](https://ko-fi.com/flixlix)! 🥰
