const fs = require("fs");

const YAML = require("json2yaml");
const log = require("./logger");

const paths = {
	YML: `${process.cwd()}/.prettierrc.yml`, // If a .yml file is already in existence
	YAML: `${process.cwd()}/.prettierrc.yaml`,
	JSON: `${process.cwd()}/.prettierrc.json`,
	JS: `${process.cwd()}/.prettierrc.js`
};

module.exports = {
	// Write func
	process(settings) {
		const format =
			settings.format === "JavaScript" ? "JS" : settings.format;

		this.delete();
		delete settings.format;
		settings = this.fix(settings);
		let content = "";
		// Placed all this in a setTimeout so that
		// first the previous .prettierrc file is deleted
		// and removing previous .prettierrc is logged
		// before the logging of writing new .prettierrc
		setTimeout(() => {
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
			log.messageCyan(`writing new .prettierrc.${format.toLowerCase()}`); // \x1b[36m === cyan
			this.write(format, content);
		}, 700);
	},
	write(format, str) {
		fs.createWriteStream(paths[format], {
			// Format should be in upper case
			flags: "w"
		}).write(str);
		log.success("setup completed");
	},
	delete() {
		for (const path in paths) {
			if (Object.prototype.hasOwnProperty.call(paths, path)) {
				fs.unlink(paths[path], error => {
					if (error) {
						return;
					}
					console.log(
						`\n\u001B[31mremoving previous ${paths[path].replace(
							/^.*\/(\.prettierrc\.(yaml|yml|json|js))/,
							"$1"
						)}\u001B[31m`
					);
				});
			}
		}
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
