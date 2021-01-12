# MMM-atHome
A module for the MagicMirror project (https://github.com/MichMich/MagicMirror) to display the next bin collections from the **@HOME** app.
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
<<<<<<< HEAD
|`email`|Yes|This is the email address you use to sign into the '@HOME' app<br><br> **Type:** `string`|
|`atHomeUrl`|No|This is the URL used to connect to the '@HOME' app - This is here in case the URL ever changes<br><br> **Type:** `string`|
|`gardenName`|No|This setting can be used to change the default name of the Chargeable garden waste bin text<br><br> **Type:** `string`|
|`foodName`|No|This setting can be used to change the default name of the Food recycling box text<br><br> **Type:** `string`|
|`paperName`|No|This setting can be used to change the default name of the Paper and Cardboard wheeled bin text<br><br> **Type:** `string`|
|`plasticsName`|No|This setting can be used to change the default name of the Plastics and Glass wheeled bin text<br><br> **Type:** `string`|
|`wasteName`|No|This setting can be used to change the default name of the Waste wheeled bin text<br><br> **Type:** `string`|
=======
|`email`|Yes|This is the email address you use to sign into the **@HOME** app<br><br> **Type:** `string`|
|`option`|Yes|This is a dummy option<br><br> **Type:** `string`|
>>>>>>> 6aedebc91fab44c9ccfb0cb77dfcaf16a0d5ca21

Example of the config.js entry:

```
		{
			module: "MMM-atHome",
			position: "top_right",
			config: {
				email: "athome@email.com".
        gardenName: 'Garden waste',
        foodName: 'Food recycling',
        paperName: 'Paper and Cardboard',
        plasticsName: 'Plastics and Glass',
        wasteName: 'Normal rubbish'
			},
		},
```
