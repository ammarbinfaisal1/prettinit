const boxen = require("boxen"),
	logSymbols = require("log-symbols");

module.exports = {
	success(line) {
		boxen(`${logSymbols.success} ${line}`, {
			borderStyle: "double",
			padding: 1,
			borderColor: "green"
		});
	},
	warning(line) {
		this.addMargin(`${logSymbols.warning}  \x1b[33m${line}\x1b[0m`); // \x1b[33m === yellow
	},
	error(line) {
		this.addMargin(`${logSymbols.error}  \x1b[31m${line}\x1b[31m`); // \x1b[31m === red
	},
	messageCyan(line) {
		this.addMargin(`\x1b[36m${line}\x1b[36m`); // \x1b[36m === cyan
	},
	addMargin(line) {
		console.log(`\n${line}\n`);
	}
};
