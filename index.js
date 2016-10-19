#!/usr/bin/env node

var request = require('request');
var cheerio = require('cheerio');

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

if (args.length == 0) {
    help_me();
}

var url = 'http://www.thesaurus.com/browse/' + encodeURIComponent(args.join(' '));

request(url, function(err, resp, body){
    $ = cheerio.load(body, { ignoreWhitespace: true });

    var synonyms = $('div.relevancy-list ul li a span.text');
    var synonyms = synonyms.map(function(_i, _element){
        return $(this).text();
    }).get().sort();

    var antonyms = $('div.list-holder ul li a span.text');
    var antonyms = antonyms.map(function(_i, _element){
        return $(this).text();
    }).get().sort();

    if (output_json) {
        console.log(JSON.stringify({
            synonyms: synonyms,
            antonyms: antonyms
        }));
    } else {
        console.log('Synonyms: ' + synonyms.join(', '));
        if (antonyms.length > 0) {
            console.log('Antonyms: ' + antonyms.join(', '));
        }
    }
});
