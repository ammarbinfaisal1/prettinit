const Configstore = require("configstore"),
	config = new Configstore("pretinit"),
	configFile = require("./configFile");
log = require("./logger");

module.exports = {
	writeDefault() {
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
	}
};
