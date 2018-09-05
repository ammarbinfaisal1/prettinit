const fs = require("fs");

const YAML = require("json2yaml");
const log = require("./logger");
const inquirer = require("./inquirer");

const basicPath = `${process.cwd()}/.prettierrc`;
const exts = ["", ".js", ".json", ".yml", ".yaml"]

module.exports = {
	// Write func
	process(settings) {
		const format = settings.format === "JavaScript" ? "JS" : settings.format;

		delete settings.format;
		settings = this.fix(settings);
		let content = "";

		if (format === "YAML") {
			content = YAML.stringify(settings);
		} else if (format === "JSON") {
			content = JSON.stringify(settings, undefined, 2);
		} else if (format === "JS") {
			content = `module.exports = ${JSON.stringify(
				settings,
				undefined,
				2
			).replace(/"(\w+)"\s*(:)/g, "$1$2")}`;
		}
		log.messageCyan(`writing new .prettierrc${format === 'JS' ? ".js" : ""}`);
		this.write(format, content);
	},

	write(format, str) {
		const path = format.toUpperCase() === 'JS' ? `${basicPath}.js` : `${basicPath}`;
		const existingFiles = this.existingFiles();
		if (existingFiles > 0) {
			console.log(typeof inquirer.confirm)
			inquirer.confirm("Do you wish to remove existing .prettierc file(s)?")
				.then(choice => {
					if (choice.confirm) {
						this.deleteAll;
					}
				})
		}
		fs.createWriteStream(path, {
			// Format should be in upper case
			flags: "w"
		}).write(str);
		log.success("setup completed");
	},

	deleteAll() {
		for (const ext of exts) {
			const path = `${basicPath}${ext}`
			fs.unlink(path, (error) => {
				if (error) {
					return;
				}
				log.error(`removing previous .prettierrc${exts[ext]}`);
			});
		}
	},

	existingFiles() {
		const existingFilesArr = [];
		let num = 0;
		for (const ext of exts) {
			const path = `${basicPath}${ext}`
			if (fs.existsSync(path)) {
				existingFilesArr.push(path);
				num++;
			}
		}
		return num;
	},

	fix(settings) {
		const {
			qoutes,
			indentation,
			trailingComma,
			arrowParens,
			tabWidth
		} = settings;

		if (qoutes === "double") {
			settings.singleQuote = false;
		} else {
			settings.singleQuote = true;
		}
		delete settings.qoutes;

		if (indentation === "tabs") {
			settings.useTabs = true;
		} else {
			settings.useTabs = false;
		}
		delete settings.indentation;

		if (trailingComma === "No") {
			settings.trailingComma = "none";
		} else if (trailingComma === "Wherever vaild in es5.") {
			settings.trailingComma = "es5";
		} else if (trailingComma === "Wherever possible.") {
			settings.trailingComma = "all";
		}

		if (arrowParens) {
			settings.arrowParens = "always";
		} else {
			settings.arrowParens = "avoid";
		}

		settings.tabWidth = Number(tabWidth);

		return settings;
	}
};
