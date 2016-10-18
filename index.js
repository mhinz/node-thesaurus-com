if (process.argv.length <= 2) {
    var path = require('path');
    console.log('usage: ' + path.basename(process.argv[1]) + ' <query>');
    process.exit(1);
}

var request = require('request');
var cheerio = require('cheerio');

var url = 'http://www.thesaurus.com/browse/' +
    encodeURIComponent(process.argv.slice(2).join(' '));

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

    console.log('Synonyms: ' + synonyms.join(', '));

    if (antonyms.length > 0) {
        console.log('Antonyms: ' + antonyms.join(', '));
    }
});
