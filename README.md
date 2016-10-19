[![Build Status](https://travis-ci.org/mhinz/node-thesaurus-com.svg?branch=master)](https://travis-ci.org/mhinz/node-thesaurus-com)
[![npm](https://img.shields.io/npm/v/thesaurus-com.svg)](https://www.npmjs.com/package/thesaurus-com)

## Description

Use [thesaurus.com](http://www.thesaurus.com/) to look up synonyms and, if
available, antonyms.

Moreover, it comes with an executable called `tcom`.

## Installation

```
$ npm install -g thesaurus-com
```

## Usage

```
$ tcom always
Synonyms: consistently, constantly, eternally, ever, everlastingly, evermore, for keeps, forevermore, in perpetuum, invariably, perpetually, regularly, repeatedly, till blue in the face, till cows come home, till hell freezes over, unceasingly, without exception
Antonyms: at no time, never
```

```
$ tcom -j always
{"synonyms":["consistently","constantly","eternally","ever","everlastingly","evermore","for keeps","forevermore","in perpetuum","invariably","perpetually","regularly","repeatedly","till blue in the face","till cows come home","till hell freezes over","unceasingly","without exception"],"antonyms":["at no time","never"]}
```
