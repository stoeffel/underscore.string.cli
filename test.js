var expect = require('expect.js');
var string = require('./');

describe('#command', () => {
  it('returns the first element of the list', () => {
    expect(string.command(['camelize', 'hello world'])).to.eql('camelize');
  });
});

describe('#has', () => {
  it('returns true if underscore.string has this method', () => {
    expect(string.has('camelize')).to.be.ok();
    expect(string.has('humanize')).to.be.ok();
    expect(string.has('nope')).to.not.be.ok();
    expect(string.has(undefined)).to.not.be.ok();
    expect(string.has(null)).to.not.be.ok();
    expect(string.has(0)).to.not.be.ok();
    expect(string.has('VERSION')).to.not.be.ok();
  });
});

describe('#str', () => {
  it('returns the second element of a list', () => {
    expect(string.str(['camelize', 'hello', 'world', '!'])).to.eql('hello world !');
  });

  it('returns the second element of a list as an array if the method is an array-method', () => {
    expect(string.str(['toSentence', 'foo', 'bar', 'moo'])).to.eql(['foo', 'bar', 'moo']);
    expect(string.str(['toSentence', 'foo', 'bar', 'moo'])).to.eql(['foo', 'bar', 'moo']);
  });
});

describe('#args', () => {
  it('returns all elements after the second element of a list', () => {
    expect(string.args([])).to.eql([]);
    expect(string.args(['foo'])).to.eql(['foo']);
    expect(string.args(['foo', 'bar'])).to.eql(['foo', 'bar']);
  });

  it('numbers should be numbers', () => {
    expect(string.args(['2'])).to.eql([2]);
    expect(string.args(['1', 'foo'])).to.eql([1, 'foo']);
    expect(string.args(['1foo'])[0]).to.equal('1foo');
    expect(string.args([''])[0]).to.equal('');
  });

  it('booleans should be booleans', () => {
    expect(string.args(['false', 'str', 'true', '1'])).to.eql([false, 'str', true, 1]);
    expect(string.args(['1ok'])[0]).to.equal('1ok');
  });
});

describe('#run', () => {
  it('runs the command', () => {
    expect(string.run('camelize', 'hello world !', [])).to.eql('helloWorld!');
    expect(string.run('camelize', 'hello world !')).to.eql('helloWorld!');
    expect(string.run('camelize', 'Hello world !', [true])).to.eql('helloWorld!');
    expect(string.run('toSentence', ['foo', 'bar', 'moo'])).to.eql('foo, bar and moo');
    expect(string.run('toSentence', ['foo', 'bar', 'moo'], ['.'])).to.eql('foo.bar and moo');
  });
});
