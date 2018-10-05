const fs = require("fs");

const YAML = require("json2yaml");
const log = require("./logger");

const basicPath = `${process.cwd()}/.prettierrc`;
const exts = ["", ".js", ".json", ".yml", ".yaml"];

module.exports = {
	/**
	 * Handle the user's choices
	 * @param {object} settings the .prettierrc configuration choosen by the user
	 */
	handle(settings) {
		const format = settings.format === "JavaScript" ? "JS" : settings.format;
		delete settings.format;

		settings = this.fix(settings);
		let content = "";

		if (format === "YAML") {
			content = YAML.stringify(settings);
		} else if (format === "JSON") {
			content = JSON.stringify(settings, undefined, 2);
		} else if (format === "JS") {
			content = `module.exports = ${JSON.stringify(settings, undefined, 2).replace(/"(\w+)"\s*(:)/g, "$1$2")}`;
		}

		log.info(`writing new .prettierrc${format === "JS" ? ".js" : ""}`);
		this.write(format, content);
	},

	/**
	 *
	 * @param {string} format format of the .prettierrc file
	 * @param {string} content content of the .prettierrc file
	 */
	write(format, content) {
		const path = format.toUpperCase() === "JS" ? `${basicPath}.js` : `${basicPath}`;
		fs.createWriteStream(path, { flags: "w" }).write(content);
		log.success("setup completed");
	},

	read() {
		let content;
		let format;
		const numOfExistingFiles = this.existingFiles();
		if (numOfExistingFiles === 0) log.error("There is no .prettierrc file in the current directory.");
		else if (numOfExistingFiles > 1)
			log.error("There are more than one .prettierrc file in the current directory.");
		return new Promise(resolve => {
			exts.forEach(ext => {
				fs.readFile(`${basicPath}${ext}`, (err, file) => {
					if (err) return;
					content = file.toString();
					format = ext;
				});
			});
			setTimeout(() => {
				resolve({ content, format });
			}, 240);
		});
	},

	/**
	 * @returns {number} number of existing .prettierc files
	 */
	existingFiles() {
		let num = 0;
		for (const ext of exts) {
			const path = `${basicPath}${ext}`;
			if (fs.existsSync(path)) num++;
		}
		return num;
	},

	/**
	 * Fixes the settings object
	 * @param {object} settings
	 * @returns {undefined}
	 */
	fix(settings) {
		const { qoutes, indentation, trailingComma, arrowParens, tabWidth } = settings;

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
