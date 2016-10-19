[![Build Status](https://travis-ci.org/mhinz/node-thesaurus-com.svg?branch=master)](https://travis-ci.org/mhinz/node-thesaurus-com)
[![npm](https://img.shields.io/npm/v/thesaurus-com.svg)](https://www.npmjs.com/package/thesaurus-com)

## Description

Use [thesaurus.com](http://www.thesaurus.com/) to look up synonyms and, if
available, antonyms.

Moreover, it comes with an executable called `tcom`, which can be used to start
a search from the shell. The output is either plain-text (by default) or JSON.

## Installation

```
$ npm install -g thesaurus-com
```

Or install it into the current directory, so you can play around with it:

```
$ npm install --save thesaurus-com
```

(The executable can then be found at `./node_modules/.bin/tcom`.)

## Usage

```javascript
var tcom = require('thesaurus-com');

console.log(tcom.search('never'));

// { synonyms:
//   [ 'at no time',
//     'don\'t hold your breath',
//     'forget it',
//     'nevermore',
//     'no way',
//     'not at all',
//     'not ever',
//     'not in any way',
//     'not in the least',
//     'not on your life',
//     'not under any condition' ],
//  antonyms: [ 'always', 'forever' ] }
```

```
$ tcom always
Synonyms: consistently, constantly, eternally, ever, everlastingly, evermore, for keeps, forevermore, in perpetuum, invariably, perpetually, regularly, repeatedly, till blue in the face, till cows come home, till hell freezes over, unceasingly, without exception
Antonyms: at no time, never
```

```
$ tcom -j always
{"synonyms":["consistently","constantly","eternally","ever","everlastingly","evermore","for keeps","forevermore","in perpetuum","invariably","perpetually","regularly","repeatedly","till blue in the face","till cows come home","till hell freezes over","unceasingly","without exception"],"antonyms":["at no time","never"]}
```
