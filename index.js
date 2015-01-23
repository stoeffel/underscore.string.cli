var R = require('ramda');
var s = require('underscore.string');

function isNumber(x) {
  return x.length > 0 && !isNaN(x);
}

function isBoolean(x) {
  return s.toBoolean(x) !== undefined;
}

module.exports.run = function(command, str, args) {
  return s[command].apply(null, R.concat([str], args));
};

module.exports.commands = s;
module.exports.command = R.head;
module.exports.str = R.compose(R.join(' '), R.tail);

module.exports.args = R.compose(
    R.map(function(item) {
      return R.cond(
        [isNumber, Number],
        [isBoolean, s.toBoolean],
        [R.alwaysTrue, R.identity]
      )(item);
    })
  );

module.exports.has = R.and(
    R.flip(R.has)(s),
    R.wrap(R.is(Function), function(f, x) {
      return f(s[x]);
    })
  );

