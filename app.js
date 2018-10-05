const meow = require("meow");
const inquirer = require("./lib/inquirer");
const setDefault = require("./lib/set-default");
const writeDefault = require("./lib/write-default");
const pkg = require("./lib/pkg");
const log = require("./lib/logger");

const cli = meow(
	`
	
	Options
		--set-default, -D  set the the current directory's prettier config file as default
		--write-default, -W  write the default config file in the current directory
`,
	{
		flags: {
			"set-default": {
				type: "boolean",
				alias: "D"
			},
			"write-default": {
				type: "boolean",
				alias: "W"
			}
		}
	}
);

let flagUsed = false;
for (const flag in cli.flags) {
	if (Object.prototype.hasOwnProperty.call(cli.flags, "flag") && cli.flags[flag]) {
		flagUsed = true;
		break;
	}
}

if (cli.flags.setDefault) {
	setDefault();
} else if (cli.flags.writeDefault) {
	writeDefault();
} else if (!flagUsed) {
	// Check for package.json file
	// if it exists then prompt the questions to the user
	if (!pkg.exists()) {
		log.warn("There is no package.json file in the current directory.");
		inquirer.confirmCreationOfConfigFile();
	} else if (!pkg.hasPrettierAsDevDependency()) {
		log.warn("prettier is not a dev dependency of this project");
		inquirer.confirmCreationOfConfigFile();
	} else {
		inquirer.askSetupQuestions();
	}
} else {
	log.error("An invalid flag has been used.");
}
