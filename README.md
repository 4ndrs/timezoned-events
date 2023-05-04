# Timezoned Events

Web app to keep track of events set in different timezones.

## Usage

To add new events it is necessary to have the date of the event plus the UTC offset. Let's take the following tweet as an example:
<div align="center">

![1680064708108683](https://user-images.githubusercontent.com/31898900/236016692-4d22694f-b71f-433d-8675-10404726ea2c.png)

</div>

Here, the event is a special program meant to happen on March 31st 2023 at 08:00 AM (**UTC-4**). We can use this information to add a new event:

<div align="center">

![1683141378115611](https://user-images.githubusercontent.com/31898900/236021430-d1b617d1-fecc-40eb-ab5a-a98010ecd386.png)

</div>

Here we set a title and description of our choice, and the date as shown in the above tweet with the UTC offset. The date and time will be localized using the browser's settings. By default, the UTC offset will be set to your local one for convenience. It is also possible to add external links, or set one of the pictures available to hype up the mood a little bit.

After adding the event, it will be shown on the main window as below:

<div align="center">

![1683142610105339](https://user-images.githubusercontent.com/31898900/236027161-8bea5632-f659-4a7e-8f6e-777e1d0974d5.png)

</div>

## Misc

The figma draft I worked with can be found [here](https://www.figma.com/file/GO3TQ76nGC0GxN4bQso73U). There are some notable differences since I tried to stick with Chakra UI's defaults as much as possible.
