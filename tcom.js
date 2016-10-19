#!/usr/bin/env node

var tcom = require('./index.js');

function help_me() {
    var path = require('path');
    console.log([
        'usage: ' + path.basename(process.argv[1]) + ' [-j|-h] <query>',
        '',
        'options:',
        '',
        '  -j|--json    return JSON',
        '  -h|--help    show this help',
        ''
    ].join('\n'));
    process.exit(1);
}

var args = process.argv.slice(2);
var output_json = 0;

switch (args[0]) {
case '-j':
case '--json':
    output_json = 1;
    args.shift();
    break;
case '-h':
case '--help':
    help_me();
}

if (args.length === 0) {
    help_me();
}

var match = tcom.search(args.join(' '));

if (output_json) {
    console.log(JSON.stringify(match));
} else {
    if (match.synonyms.length === 0) {
        console.log('No match found.');
    } else {
        console.log('Synonyms: ' + match.synonyms.join(', '));
        if (match.antonyms.length > 0) {
            console.log('Antonyms: ' + match.antonyms.join(', '));
        }
    }
}
