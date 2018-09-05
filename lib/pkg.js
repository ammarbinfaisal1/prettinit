const fs = require("fs");

const pathToPkg = `${process.cwd()}/package.json`;

module.exports = {
	exists() {
		return fs.existsSync(pathToPkg);
	},
	hasPrettierAsDevDependency() {
		const data = fs.readFileSync(pathToPkg, { encoding: "utf8" });

		const pkg = JSON.parse(data);
		if (
			pkg.devDependencies &&
			Object.prototype.hasOwnProperty.call(pkg.devDependencies, "prettier")
		) {
			return true;
		}
		return false;
	}
};
