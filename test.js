var request = require('request');
var cheerio = require('cheerio');

if (process.argv.length <= 2) {
    var path = require('path');
    console.log('usage: ' + path.basename(process.argv[1]) + ' <query>');
    process.exit(1);
}

var url = 'http://www.thesaurus.com/browse/' +
encodeURIComponent(process.argv.slice(2).join(' '));

request(url, function(err, resp, body){
    $ = cheerio.load(body, { ignoreWhitespace: true });
    text     = $('.synonym-description .txt').text();
    desc     = $('.synonym-description .ttl').text();
    synonyms = $('div.relevancy-list ul li a span.text').map(function(_i, _element){
        return $(this).text();
    }).get().sort().join(', ');
    antonyms = $('div.list-holder ul li a span.text').map(function(_i, _element){
        return $(this).text();
    }).get().sort().join(', ');

    console.log('Type: '     + text);
    console.log('Desc: '     + desc);
    console.log('Synonyms: ' + synonyms);

    if (antonyms) {
        console.log('Antonyms: ' + antonyms);
    }
});
