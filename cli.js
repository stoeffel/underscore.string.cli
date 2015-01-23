#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2), {
  stopEarly: true,
  '--': true
}),
  pkg = require('./package.json'),
  chalk = require('chalk'),
  string = require('./index');

if (argv.help || argv._.length <= 0) {
  process.stdout.write([
    chalk.bold.blue('# ' + pkg.name),
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
    chalk.gray('# => 2')
  ].join('\n'));
} else {
  var readline = require('readline');

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  rl.on('line', function(cmd) {
    var command = string.command(argv._);
    var str = cmd || string.str(argv._);
    var args = string.args(argv['--']);

    if (string.has(command)) {
      console.log(string.run(command, str, args));
    } else {
      console.error(chalk.red('Unknown command:', command));
    }
  });
}
