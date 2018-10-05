#!/usr/bin/env node

const Store = require("configstore");

const datastore = new Store("prettinit");

const configFile = require("./config-file"); // ConfigFile == .prettierc file
const log = require("./logger");

/**
 * Writes the default .prettierrc file in the current directory
 */
module.exports = () => {
	const defaultConfigFile = datastore.get("default config file");

	if (defaultConfigFile === undefined) {
		log.error("Sorry, there isn't any default configuration set.");
		process.exit();
	}

	const { format, content } = defaultConfigFile;

	log.info(`writing default .prettierrc${format.toLowerCase()} in the current directory`);

	configFile.write(format, content);
};
