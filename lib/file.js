const fix = (settings) => {
	const { qoutes, indentation, trailingComma, arrowParens } = settings;

	if (qoutes === "double") settings.singleQuote = false;
	else settings.singleQuote = true;
	delete settings.qoutes;

	if (indentation === "tabs") settings.useTabs = true;
	else settings.useTabs = false;
	delete settings.indentation;

	if (trailingComma === "No") settings.trailingComma = "none";
	else if (trailingComma === "Where vaild in es5.")
		settings.trailingComma = "es5";
	else if (trailingComma === "Wherever possible.")
		settings.trailingComma = "all";

	if (arrowParens) settings.arrowParens = "always";
	else settings.arrowParens = "avoid";

	return settings;
};

module.exports = {
	write(settings) {
		const { format } = settings,
			fs = require("fs"),
			JS = require("./modulify.js");
		paths = {
			YAML: `${process.cwd()}/.prettierrc.yaml`,
			JSON: `${process.cwd()}/.prettierrc.json`,
			JS: `${process.cwd()}/.prettierrc.js`
		};
		//to delete previous .prettierrc file
		for (const path in paths) {
			fs.unlink(paths[path], (error) => {
				if (error) return;
				console.log(
					`\x1b[31mremoving previous ${paths[path].replace(
						/^.*\/(\.prettierrc\.(yaml|json|js))/,
						"$1"
					)}\x1b[31m`
				);
			});
		}
		delete settings.format;
		// placed all this in a setTimeout so that
		// first the previous .prettierrc file is deleted
		// and removing previous .prettierrc is logged
		// before the logging of writing new .prettierrc
		setTimeout(() => {
			settings = fix(settings);
			if (format === "YAML") {
				const YAML = require("json2yaml");
				console.log("\x1b[36mwriting new .prettierrc.yaml\x1b[36m"); // \x1b[36m === cyan
				fs
					.createWriteStream(paths.YAML, {
						flags: "w"
					})
					.write(YAML.stringify(settings));
			} else if (format === "JSON") {
				console.log("\x1b[36mwriting new .prettierrc.json\x1b[36m"); // \x1b[36m === cyan
				fs
					.createWriteStream(paths.JSON, {
						flags: "w"
					})
					.write(JSON.stringify(settings, undefined, 2));
			} else {
				console.log("\x1b[36mwriting new .prettierrc.js\x1b[36m"); // \x1b[36m === cyan
				fs
					.createWriteStream(paths.JS, {
						flags: "w"
					})
					.write(JS.modulify(JSON.stringify(settings, undefined, 2)));
			}
		}, 700);
	}
};
