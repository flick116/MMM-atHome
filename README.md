# MMM-atHome
A module for the MagicMirror project (https://github.com/MichMich/MagicMirror) to display the next bin collections from the '@HOME app '

Columns, and headings, as well as how some of the data is displayed is configurable and the inside icon are configurable.

![](images/example.png)

## Installation

Clone this repository in your `~/MagicMirror/modules/` folder `( $ cd ~MagicMirror/modules/ )`:
```
git clone https://github.com/flick116/MMM-atHome
```
## Dependencies

[request](https://www.npmjs.com/package/request)

## Note
Work in progress

## Config

|Option|Required|Description|
|---|---|---|
|`email`|Yes|This is the email address you use to sign into the '@HOME' app<br><br> **Type:** `string`|
|`option`|Yes|This is a dummy option<br><br> **Type:** `string`|

Example of the config.js entry:

```
		{
			module: "MMM-atHome",
			header: "Next Bin Collection",
			position: "top_right",
			config: {
				email: "athome@email.com"
			},
		},
```