underscore.string.cli
=====================
[![Build Status](https://travis-ci.org/stoeffel/underscore.string.cli.svg)](https://travis-ci.org/stoeffel/underscore.string.cli) [![npm version](https://badge.fury.io/js/underscore.string.cli.svg)](http://badge.fury.io/js/underscore.string.cli)
> Use [underscore.string](http://epeli.github.io/underscore.string/) on your commandline

Installation
------------

`npm install underscore.string.cli -g`

Usage
-----

You can use all methods from [underscore.string](http://epeli.github.io/underscore.string/).

```bash
$ string <command> <string> [-- options]

$ string camelize hello world
# js => s.camelize("hello world");
# => helloWorld

$ string camelize -hello-world -- true
# js => s.camelize("-hello-world", true);
# => helloWorld

$ string join \| -- foo bar moo boo
# js => s.join("|", "foo", "bar", "moo", "boo");
# => foo|bar|moo|boo

$ string levenshtein kitten -- kittah
# js => s.levenshtein("kitten", "kittah");
# => 2
```
