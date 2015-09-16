# build-with-npm
Howto: build with NPM


##Links

* https://nodejs.org 
* https://docs.npmjs.com/getting-started/installing-node
* http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool -- a realy good starting point for building with NPM!
* https://docs.npmjs.com/files/package.json


## Node build tools/frameworks

There are some build tools/frameworks in the node.js ecosystem.
Grunt and Gulp are probably the most common. Yeoman comes along with Grunt or Gulp under the hood.

* http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/ 
* http://ponyfoo.com/articles/choose-grunt-gulp-or-npm
* http://substack.net/task_automation_with_npm_run




## Before you begin

### Setup node.js and NPM

* Download node from https://nodejs.org/en/download/ choose the node version and follow the setup instructions. For Mac and Windows the installers should be fine.

* Install/update NPM as a global node package - you need adminstrator rights to install global packages:

On Mac/Linux:  
``sudo npm install npm -g``

On Windows: Open your dosbox via "run as Administrator" and type:  
``npm install npm -g``


see: https://docs.npmjs.com/getting-started/installing-node .  
see: https://github.com/npm/npm/wiki/Troubleshooting#upgrading-on-windows

## The Beginning: your 'package.json'

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

> BTW: If you plan to use a GitHub repository for your project, you can just create a repository on GitHub and clone that repo via GIT to your package dir. I did that with this package.

See: https://docs.npmjs.com/files/package.json


## NPM Run-Scripts - Running your node server


NPM comes with ability to run shell scripts. There are some shorthands:

If you put your server.js in the root of your project folder, you can start your server simply with:  
``npm start`` 

other run-script shorthands are:
``npm test``, ``npm stop`` or ``npm restart``


## Run-Scripts

In the package.jason there is a section ``"scripts":{ ... }`` where you can put your run-scripts. 

As an example look into the package.json from before, you will see an ``"test"`` entry followed by ``"echo \"Error: no test specified\" && exit 1"``  

If you call it like this  
``npm test``  
npm will fork a new shell, execute the echo and exit command.


## Dependencies

Well let's do more meaning full things with "test"! Run your test and make it watching for changes:

* edit the "test" line in your package.json like this:  
``"test": "./node_modules/.bin/mocha --watch"``  
* Install "mocha" and save it's dependecie:  
``npm install mocha --save-dev``  
* Add a "test"folder to your projekt and put some test.js files.

>You could install mocha global, then your "test" line would look like ``"test": "mocha --watch"``

>The "--watch" option is provided by many NPM packages, i.e. node-inspector provides it and jslint, etc.


