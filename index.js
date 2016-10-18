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
    var text     = $('.synonym-description .txt').text();
    var desc     = $('.synonym-description .ttl').text();
    var synonyms = $('div.relevancy-list ul li a span.text').map(function(_i, _element){
        return $(this).text();
    }).get().sort().join(', ');
    var antonyms = $('div.list-holder ul li a span.text').map(function(_i, _element){
        return $(this).text();
    }).get().sort().join(', ');

    console.log('Type: '     + text);
    console.log('Desc: '     + desc);
    console.log('Synonyms: ' + synonyms);

    if (antonyms) {
        console.log('Antonyms: ' + antonyms);
    }
});
