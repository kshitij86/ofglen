const fs = require('fs');
const { exec } = require('child_process');
const pkgs = require('./packages.js');
const bp = require('./boilerplate.js');
const path = require('path');

// Create a new folder with the given name
async function createDirectory(app_name){
	exec(`mkdir ${app_name}`, (error, stdout, stderr) => {
		if(error){
			console.log(error);
		}
		if(stderr){
			console.log(stderr);
		} else {
			console.log(`Created directory ${app_name}...`);
		}
	});
	return Promise.resolve(true); // Automatically returns a promise but can be returned manually
}

// Install generic modules
async function installModules(app_name){
	console.log(`It is advised to run 'ofglen' with super user permissions...`);
	for(i = 0; i < pkgs.length; i++){
		console.log(`Installing ${pkgs[i]} for app '${app_name}'...`);
		// Directory needs to be changed for every command ?!
		exec(`cd ${app_name} && npm install ${pkgs[i]} --save`, (error, stdout, stderr) => {
			if(error){
				console.log(error);
			}
			if(stderr){
				console.log(stderr);
			}
			if(stdout){
				console.log(stdout);
			}
		});
	}

	// Packages installed...
	return Promise.resolve(true);
}

// Generate app file from boilerplate
async function genServerFile(app_name){
	var pathToApp = path.join(__dirname, `./${app_name}/app.js`);
	fs.writeFile(pathToApp, bp, (err) => {
		if(err) throw err; 
		console.log('Saved contents to app.js');
	});
	return Promise.resolve(true);
}

// Initialize the app with default settings
function initializeApp(app_name){
	createDirectory(app_name).then((cdResult) => {
		exec(`cd ${app_name} && npm init -y`, (error, stdout, stderr) => {
			if(error){
				console.log(error);
			}
			if(stderr){
				console.log(stderr);
			} else {
				//console.log(stdout);
				console.log(`Intitialized '${app_name}' with default npm settings...`);

				// Show the current directory, and then try to install packages
				exec(`cd ${app_name} && pwd`, (error, stderr, stdout) => {
					if(error) console.log(error);
					if(stderr) console.log(stderr);
					if(stdout) console.log(`Now working from: ${stdout}...`);
				});

				// Once initialized, install packages in this directory
				installModules(app_name).then((imResult) => {
					console.log(`Installing all modules for ${app_name}...`);
					console.log(`Generating boilerplate code...`);
					genServerFile(app_name).then((genRes) => {
						if(!genRes) process.exit(1);
						console.log("Done");	
					});
				});
			}
		});
	});
	console.log(`Setup for '${app_name}' done...`);
}

module.exports = function(app_name){
	initializeApp(app_name);
};
