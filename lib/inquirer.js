const inquirer = require("inquirer");
const configFile = require("./config-file");
const log = require("./logger.js");
const questions = require("./questions.js");

module.exports = {
	askSetupQuestions() {
		inquirer.prompt(questions).then(settings => {
			configFile.handle(settings);
		});
	},

	confirmCreationOfConfigFile() {
		this.confirm("Do you still want to create a .prettierrc file?").then(
			choice => {
				if (choice.confirm) {
					log.messageCyan("So answer these questions.\n");
					this.askSetupQuestions();
				} else {
					console.log("\n");
					process.exit();
				}
			}
		);
	},

	confirm(message) {
		log.addMargin();
		return inquirer.prompt([
			{
				name: "confirm",
				type: "confirm",
				message
			}
		]);
	}
};
