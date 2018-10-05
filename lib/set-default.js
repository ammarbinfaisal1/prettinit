#!/usr/bin/env node

const Store = require("configstore");
const configFile = require("./config-file");
const log = require("./logger");

/**
 * Sets the .prettierrc file of the current directory as default
 */
module.exports = () => {
	const numOfExistingFiles = configFile.existingFiles();

	if (numOfExistingFiles > 1) {
		log.warning(
			`There are ${numOfExistingFiles} prettier config files in the current directory.` +
				"Please keep only one config file."
		);
		process.exit();
	} else if (numOfExistingFiles === 0) {
		log.error("There is no config file in the current directory.");
		process.exit();
	}

	const dataStore = new Store("prettinit");
	configFile.read().then(data => {
		dataStore.set({ "default config file": data });
		log.success(
			`Current directory's .prettierc${
				data.format
			} file has been set as default.\n  Now you can use it by the command\u001B[1m pretinit -W \u001B[1m`
		);
	});
};
