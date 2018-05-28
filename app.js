#!/usr/bin/env node

const inquirer = require("./lib/inquirer"),
	{ setDefault } = require("./lib/setDefault"),
	{ useDefault } = require("./lib/useDefault"),
	pkg = require("./lib/pkg"),
	log = require("./lib/logger"),
	fs = require("fs"),
	meow = require("meow");

const cli = meow(
	`
	
	Options
		--set-default, -D  set the the current directory's prettier config file as default
		--use-default, -d  use the default config file in the current directory
`,
	{
		flags: {
			"set-default": {
				type: "boolean",
				alias: "D"
			},
			"use-default": {
				type: "boolean",
				alias: "d"
			}
		}
	}
);

if (cli.flags.setDefault) setDefault();
else if (cli.flags.useDefault) useDefault();
else {
	// check for package.json file
	// if it exists then prompt the questions to the user
	if (!pkg.exists()) {
		log.warning("There is no package.json file in the current directory.");
		inquirer.confirmCreationOfConfigFile();
	} else if (!pkg.hasPrettierAsDevDependency()) {
		log.warning("\x1b[1mprettier is not a dev dependency of this project"); // \x1b[0m === reset & \x1b[1m === bright
		inquirer.confirmCreationOfConfigFile();
	} else inquirer.askSetupQuestions();
}
