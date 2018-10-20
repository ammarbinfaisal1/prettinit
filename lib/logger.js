const logSymbols = require("log-symbols");
const chalk = require("chalk");

module.exports = {
	success(line) {
		this.addMargin(`${logSymbols.success} ${chalk.cyan(line)}`);
	},
	warn(line) {
		this.addMargin(`${logSymbols.warning}  ${chalk.yellow(line)}`);
	},
	error(line) {
		this.addMargin(`${logSymbols.error} ${chalk.red(line)}`);
	},
	info(line) {
		this.addMargin(`${logSymbols.info} ${chalk.blue(line)}`);
	},
	addMargin(line) {
		console.log(`\n${line}`);
	},
	setupCompleted() {
		this.success("setup completed");
	}
};
