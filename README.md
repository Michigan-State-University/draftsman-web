# Draftsman Web Application

## Purpose
To create tooling to assist F5 Support teams for onboarding applications delivered through the F5 BIG-IP platform. This application can easily be run locally, on a dedicated server that can serve static content, or even the [Now platform](https://zeit.co/now) by Zeit.

![Draftsman in action](https://cl.ly/0r3N0u221419/download/Screen%20Recording%202017-07-31%20at%2010.22%20PM.gif "Draftsman in action")


## Running Locally

You can quickly get this application running locally with any http server you have available. One option is to:
* Install [Node.js](https://nodejs.org/en/download/)
* Install the `serve` npm module with `npm i -g serve`
* Clone the repository to your local system
* Change to the directory where you cloned the project
* Type `serve` and browse to the listed web address

## Development Requirements
To work with the project you will need:

* Browser
* Local web server
* Text editor

## Future Enhancements
* Allow for user preferences to be set for things like client SSL profiles.
* Provide a flag to enable / disable the firewall request or change order buttons
* Allow for other service management integration

## Caveats

Some aspects of this application are specific to our environment, such as the firewall request generation and change order generation. 
