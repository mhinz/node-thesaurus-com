var request = require('request');
var cheerio = require('cheerio');

var url = 'http://www.thesaurus.com/browse/positive'

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
    console.log('Antonyms: ' + antonyms);
});
