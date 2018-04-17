After cloning this repo, run this command:

$ git remote add upstream git@github.com:wesbos/React-For-Beginners-Starter-Files.git

And each time you wish to update your master with the upstream, do this:

$ git fetch upstream
$ git rebase upstream/master

Here are some additional setup notes which ignore how to install the base React files and also ignore the initial webpack setup. 

1) Install React Developer Tools extension for Chrome

Install Node

Install VS Code

Install the following VS Code extensions:

Babel JavaScript
Import Cost from Wix
Prettier - Code formatter from Esben Peterson

Possibly also some extension for Emmet for JSX, though I haven't yet figured that one out.

https://code.visualstudio.com/docs/editor/emmet

2) cd into the "catch-of-the-day" folder in the git repo, run ...

$ npm install

$ npm start

This will start a local browser

3) Create your first component
