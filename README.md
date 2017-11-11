# electron-demo
Example of desktop application using Electron.

### Run the application
From project directory, open command line and run:
`npm start`.

### Package the application
From project directory, open command line (in admin mode) and run: 
`npm run buid`

### How to / Memo
To create a new application:
```
npm init -y
npm install electron --save-dev --save-exact
```

In packages.config, add in scripts: `"start": "electron ."` => npm start will start electron

To prepare the application for packaging, convert icons to .ico, .icns and .png files.
Install npm package electron packager:

`npm install electron-packager --save-dev`.
In packages.config, add in scripts: `"build": "electron-packager . --platform=darwin,win32,linux --arch=x64 --icon=app"`. This will create zip folders for the 3 platforms.
