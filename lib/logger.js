const logSymbols = require("log-symbols");

module.exports = {
	success(line) {
		console.log(`${logSymbols.success} ${line}\n`);
	},
	warning(line) {
		this.addMargin(`${logSymbols.warning}  \u001B[33m${line}\u001B[0m`); // \x1b[33m === yellow
	},
	error(line) {
		this.addMargin(`${logSymbols.error}  \u001B[31m${line}\u001B[31m`); // \x1b[31m === red
	},
	messageCyan(line) {
		this.addMargin(`${logSymbols.info} \u001B[36m${line}\u001B[36m`); // \x1b[36m === cyan
	},
	addMargin(line) {
		console.log(`\n${line}\n`);
	}
};
