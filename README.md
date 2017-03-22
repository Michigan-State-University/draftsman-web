# Draftsman Web Application.

## Purpose
To create tooling to assist the F5 Support team for onboarding, modifying, and retiring applications delivered through the F5 BIG-IP platform.
A running copy of this web application can be found on the [Now platform](https://zeit.co/now) at https://draftsman-web-hsfspdaamj.now.sh and does not require you to run it locally.
Note: The URL above will change everytime the application is deployed.

## Development Requirements
To work with the project you will need:

* Browser
* Local web server
* Text editor

## Getting Started
Clone the repository to a directory that your local web server can serve content from

`git clone https://gitlab.msu.edu/f5-adc-support/draftsman-web.git`

Start your web server and browse to the address and port that your local web server is serving content from. This will vary by operating system and web server preference.


### Easy macOS Development Setup
Open a Terminal window

Install Homebrew

`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

Install node using Homebrew

`brew install node`

Install dependencies

```
npm install -g live-server gulp-cli
npm install gulp -D
```

Clone the repository to a local directory

`git clone https://gitlab.msu.edu/f5-adc-support/draftsman-web.git`

Change to the cloned directory and start the server

```
cd draftsman-web
live-server
```
