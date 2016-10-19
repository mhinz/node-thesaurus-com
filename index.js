/*global $:true */

var request = require('sync-request');
var cheerio = require('cheerio');

function search(query) {
    var url = 'http://www.thesaurus.com/browse/' + encodeURIComponent(query);
    var req = request('GET', url);

    if (req.statusCode !== 200) {
        return {synonyms: [], antonyms: []};
    }

    $ = cheerio.load(req.getBody(), { ignoreWhitespace: true });

    var synonyms = $('div.relevancy-list ul li a span.text');
    synonyms = synonyms.map(function() {
        return $(this).text();
    }).get().sort();

    var antonyms = $('div.list-holder ul li a span.text');
    antonyms = antonyms.map(function() {
        return $(this).text();
    }).get().sort();

    return {
        synonyms: synonyms,
        antonyms: antonyms
    };
}

exports.search = search;
