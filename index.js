#!/usr/bin/env node

var request = require('request');
var cheerio = require('cheerio');

var args = process.argv.slice(2);
var output_json = 0;

if (args[0] == '-j') {
    output_json = 1;
    args.shift();
}

if (args.length == 0) {
    var path = require('path');
    console.log('usage: ' + path.basename(process.argv[1]) + ' <query>');
    process.exit(1);
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
