var R = require('ramda');
var s = require('underscore.string');

var ARRAY_METHODS = ['toSentence', 'toSentenceSerial'];

function isNumber(x) {
  return x.length > 0 && !isNaN(x);
}

function isBoolean(x) {
  return s.toBoolean(x) !== undefined;
}

module.exports.run = function(command, str, args) {
  return R.apply(
    s[command],
    R.concat([str], args || [])
  );
};

module.exports.commands = s;
module.exports.command = R.head;
module.exports.str = R.ifElse(
    R.wrap(R.flip(R.contains)(ARRAY_METHODS), function(f, x) {
      return f(R.head(x));
    }),
    R.tail,
    R.compose(R.join(' '), R.tail)
);

module.exports.args = R.map(
  R.cond(
    [isNumber, Number],
    [isBoolean, s.toBoolean],
    [R.alwaysTrue, R.identity]
  )
);

module.exports.has = R.and(
  R.flip(R.has)(s),
  R.wrap(R.is(Function), function(f, x) {
    return f(s[x]);
  })
);
