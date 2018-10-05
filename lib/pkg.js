const fs = require("fs");

const pathToPkg = `${process.cwd()}/package.json`;

module.exports = {
	/**
	 * @returns {boolean} package.json exists or not
	 */
	exists: () => fs.existsSync(pathToPkg),

	/**
	 * @returns {boolean} has prettier as dev dependency
	 */
	hasPrettierAsDevDependency: () => {
		const data = fs.readFileSync(pathToPkg, { encoding: "utf8" });
		const pkg = JSON.parse(data);
		if (pkg.devDependencies && Object.prototype.hasOwnProperty.call(pkg.devDependencies, "prettier")) {
			return true;
		}
		return false;
	}
};
