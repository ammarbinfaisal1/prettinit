#!/usr/bin/env node

const inquirer = require("./lib/inquirer");
const clear = require("clear");

let settings = [];

async function ask() {
	settings = await inquirer.inquire();
}
ask();
