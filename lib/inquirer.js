const inquirer = require("inquirer");

const configFile = require("./configFile");

const log = require("./logger.js");

const questions = [
	{
		name: "printWidth",
		message: "What will be the print width?",
		default: 80,
		type: "input"
	},
	{
		name: "qoutes",
		message: "What quotes do you use for strings?",
		type: "list",
		choices: ["double", "single"]
	},
	{
		name: "tabWidth",
		message: "What will be the tab width?",
		type: "input",
		default: 2,
		validate(userInput) {
			if (userInput < 2) {
				return "Tab width cannot be less than 2";
			}
			if (userInput > 8) {
				return "Tab width cannot be greater than 8";
			}
			return true;
		}
	},
	{
		name: "indentation",
		message: "What style of indentation do you use?",
		type: "list",
		choices: ["tabs", "Spaces"]
	},
	{
		name: "semi",
		message: "Do you require semicolons?",
		type: "confirm"
	},
	{
		name: "trailingComma",
		message: "Do you use trailing commas?",
		type: "list",
		choices: ["No", "Wherever vaild in es5.", "Wherever possible."]
	},
	{
		name: "bracketSpacing",
		message: "Should there be spaces b/w brackets in object literals",
		type: "confirm"
	},
	{
		name: "arrowParens",
		message:
			"Do you include parentheses around a sole arrow function parameter?",
		type: "confirm"
	},
	{
		name: "parser",
		message: "Which parser will prettier use?",
		type: "list",
		choices: [
			"flow",
			"babylon",
			"typescript",
			"postcss",
			"json",
			"graphql",
			"markdown"
		]
	},
	{
		name: "format",
		message: "What format do you want your config file to be in?",
		type: "list",
		choices: ["YAML", "JavaScript", "JSON"]
	}
];

module.exports = {
	askSetupQuestions() {
		inquirer.prompt(questions).then(settings => {
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
			.then(choice => {
				if (choice.confirm) {
					log.messageCyan("So answer these questions.\n");
					this.askSetupQuestions();
				} else {
					console.log("\n");
					process.exit();
				}
			});
	}
};
