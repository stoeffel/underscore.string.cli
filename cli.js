#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2), {
  stopEarly: true,
  '--': true
}),
  string = require('./index'),
  help = require('./help'),
  chalk = require('chalk');

if (argv.help || argv._.length <= 0) {
  console.log(help.join('\n'));

} else {
  var str = string.str(argv._);
  var command = string.command(argv._);
  var args = string.args(argv['--']);


  if (!string.has(command)) {
    console.error(chalk.red('Unknown command:', command));
    process.exit(1);
  }

  if (!str.length && str.length <= 0) {
    var readline = require('readline');

    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });

    rl.on('line', function(str) {
      runCmd(command, str, args);
    });
  } else {
    runCmd(command, str, args);
  }
}

function runCmd(command, str, args) {
  if (string.has(command)) {
    console.log(string.run(command, str, args));
  } else {
    console.error(chalk.red('Unknown command:', command));
  }
}
