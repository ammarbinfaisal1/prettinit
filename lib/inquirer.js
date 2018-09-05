#!/usr/bin/env node

const inquirer = require("inquirer");
const configFile = require("./config-file");
const log = require("./logger.js");
const questions = require("./questions.js");

module.exports = {
	askSetupQuestions() {
		inquirer.prompt(questions).then((settings) => {
			configFile.process(settings);
		});
	},

	confirmCreationOfConfigFile() {
		inquirer
			.prompt([
				{
					name: "confirm",
					type: "confirm",
					message: "Do you still want to create a .prettierrc file?"
				}
			])
			.then((choice) => {
				if (choice.confirm) {
					log.messageCyan("So answer these questions.\n");
					this.askSetupQuestions();
				} else {
					console.log("\n");
					process.exit();
				}
			});
	},

	confirm(message) {
		console.log(message)
		return inquirer
			.prompt([
				{
					name: "confirm",
					type: "confirm",
					message
				}
			])
	}
};
