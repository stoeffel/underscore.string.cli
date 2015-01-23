#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2), {
  stopEarly: true,
  '--': true
}),
  pkg = require('./package.json'),
  string = require('./index'),
  chalk = require('chalk'),
  repeat = require('underscore.string/repeat');

if (argv.help || argv._.length <= 0) {
  console.log([
    '',
    chalk.bold.blue(pkg.name),
    chalk.bold.blue(repeat('=', pkg.name.length)),
    '',
    pkg.description,
    '',
    'Usage',
    '-----',
    '$ string <command> <string> [-- options]',
    '',
    '$ string camelize hello world',
    chalk.gray('# js => s.camelize("hello world");'),
    chalk.gray('# => helloWorld'),
    '',
    '$ string camelize -hello-world -- true',
    chalk.gray('# js => s.camelize("-hello-world", true);'),
    chalk.gray('# => helloWorld'),
    '',
    '$ string join \\| -- foo bar moo boo',
    chalk.gray('# js => s.join("|", "foo", "bar", "moo", "boo");'),
    chalk.gray('# => foo|bar|moo|boo'),
    '',
    '$ string levenshtein kitten -- kittah',
    chalk.gray('# js => s.levenshtein("kitten", "kittah");'),
    chalk.gray('# => 2'),
    '',
    '$ echo "foo    bar" | string clean | string capitalize',
    chalk.gray('# js => s("foo    bar").clean().capitalize().value()'),
    chalk.gray('# => Foo bar'),
    ''
  ].join('\n'));
} else {
  var str = string.str(argv._);
  var command = string.command(argv._);
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

    rl.on('line', function(cmd) {
      runCmd(argv, cmd);
    });
  } else {
    runCmd(argv, str);
  }
}

function runCmd(argv, str) {
  var command = string.command(argv._);
  var args = string.args(argv['--']);

  if (string.has(command)) {
    console.log(string.run(command, str, args));
  } else {
    console.error(chalk.red('Unknown command:', command));
  }
}
