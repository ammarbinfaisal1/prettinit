#!/usr/bin/env node

const inquirer = require("inquirer");
const configFile = require("./config-file");
const log = require("./logger");
const questions = require("./questions.js");

module.exports = {
	askSetupQuestions() {
		inquirer.prompt(questions).then(settings => {
			configFile.handle(settings);
		});
	},

	confirmCreationOfConfigFile() {
		this.confirm("Do you still want to create a .prettierrc file?").then(choice => {
			if (choice.confirm) {
				log.info("So answer these questions.\n");
				this.askSetupQuestions();
			} else {
				console.log("\n");
				process.exit();
			}
		});
	},

	confirm(message) {
		console.log();
		return inquirer.prompt([
			{
				name: "confirm",
				type: "confirm",
				message
			}
		]);
	}
};
