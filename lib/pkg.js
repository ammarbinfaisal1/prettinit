const fs = require("fs"),
	pathToPkg = `${process.cwd()}/package.json`;

module.exports = {
	exists() {
		return fs.existsSync(pathToPkg);
	},
	hasPrettierAsDevDependency() {
		const data = fs.readFileSync(pathToPkg, { encoding: "utf8" }),
			pkg = JSON.parse(data);
		if (
			pkg.devDependencies &&
			pkg.devDependencies.hasOwnProperty("prettier")
		)
			return true;
		return false;
	}
};
