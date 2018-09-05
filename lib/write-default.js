#!/usr/bin/env node

const Configstore = require("configstore");

const config = new Configstore("prettinit");

const configFile = require("./config-file"); // ConfigFile == .prettierc file
const log = require("./logger");

module.exports = () => {
	const defaultConfigFile = config.get("default config file");
	if (defaultConfigFile === undefined) {
		log.error("Sorry, there isn't any default configuration set.");
		process.exit();
	}
	const { format, content } = defaultConfigFile;
	log.messageCyan(
		`writing default .prettierrc.${format.toLowerCase()} in the current directory`
	);
	configFile.write(format, content);
};
