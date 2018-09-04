const fs = require("fs");
const Configstore = require("configstore");
const log = require("./logger");

module.exports = {
	setDefault() {
		const configFiles = [];

		["json", "yml", "yaml", "js"].forEach(extension => {
			fs.readFile(
				`${process.cwd()}/.prettierrc.${extension}`,
				{ encoding: "utf8" },
				(error, file) => {
					if (error) {
						return;
					}
					configFiles.push({
						format: extension.toUpperCase(),
						content: file
					});
				}
			);
		});
		// SetTimeout so that the previous task of read the file gets finished
		setTimeout(() => {
			const numOfConfigFiles = configFiles.length;

			if (numOfConfigFiles > 1) {
				log.warning(
					`There are ${numOfConfigFiles} prettier config files in the current directory.
					 Please keep only one config file.`
				);
				process.exit();
			} else if (numOfConfigFiles === 0) {
				log.error("There is no config file in the current directory.");
				process.exit();
			}

			const config = new Configstore("prettinit");
			config.set({
				"default config file": configFiles[0]
			});

			log.success(
				`Current directory's .prettierc.${configFiles[0].format.toLowerCase()} file has been set as default.\n  Now you can use it by the command\u001B[1m pretinit -W \u001B[1m` // \x1b[1m === bright
			);
		}, 700);
	}
};
