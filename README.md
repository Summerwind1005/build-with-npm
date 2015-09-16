# build-with-npm
Howto: build with NPM


##Links

* https://nodejs.org 
* https://docs.npmjs.com/getting-started/installing-node



## Before you begin

### Setup node.js and NPM

* Download node from https://nodejs.org/en/download/ choose the node version and follow the setup instructions. For Mac and Windows the installers should be fine.

* Install/update NPM as a global node package - you need adminstrator rights to install global packages:

On Mac/Linux:  
``sudo npm install npm -g``

On Windows: Open your dosbox via "run as Administrator" and type:  
``npm install npm -g``


see: https://docs.npmjs.com/getting-started/installing-node

## The Beginning your 'package.json'

After setting up Node.js and NPM you are ready to start with your package. 
Create a directory for your package, switch to it and call npm.

``npm init``

This will ask you some questions and create a package.json file for you. The output may look something like that:

``{``  
``"name": "build-with-npm",``  
``  "version": "0.0.1",``  
``  "description": "Howto: Build with NPM",``  
``  "main": "index.js",``  
``  "scripts": {``  
``    "test": "echo \"Error: no test specified\" && exit 1"``  
``  },``  
``  "repository": {``  
``    "type": "git",``  
``    "url": "git+https://github.com/jscodingnights/build-with-npm.git"``  
``  },``  
``  "keywords": [ "build", "npm" ],``  
``  "author": "nikolai@nikim.de",``  
``  "license": "MIT",``  
``  "bugs": { "url": "https://github.com/jscodingnights/build-with-npm/issues" },``  
``  "homepage": "https://github.com/jscodingnights/build-with-npm#readme"``  
``}``  
...
