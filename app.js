const makeNewApp = require('./make-app.js');
/*
	Program workflow:
	1. Package is installed.
	2. A name for the app alongwith is types is passed with the command (or a specific one, more later).
	3. The folder with default dependencies and starter code is created.

*/

// Command line constants
const CREATE_CMD = 'make-app';


// Get the command line arguments
var option = process.argv.slice(2)[0];


if(option){
	if(option === CREATE_CMD){
		if(process.argv.slice(2)[1]){
			app_name = process.argv.slice(2)[1];
			makeNewApp(app_name);
		} else {
			console.log(`An app has no name...\nProvide a name for the app: 'ofglen ${CREATE_CMD} <NAME>'`);
			process.exit(1);
		}
	}
} else {
	console.log(`Invalid arguments, try again: 'ofglen <COMMAND>'`);
	process.exit(1);
}
