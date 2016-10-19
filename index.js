/*global $:true */

const request = require('sync-request');
const cheerio = require('cheerio');

function search(query) {
    const url = 'http://www.thesaurus.com/browse/' + encodeURIComponent(query);
    const req = request('GET', url);

    if (req.statusCode !== 200) {
        return {synonyms: [], antonyms: []};
    }

    $ = cheerio.load(req.getBody(), { ignoreWhitespace: true });

    let synonyms = $('div.relevancy-list ul li a span.text');
    synonyms = synonyms.map(function() {
        return $(this).text();
    }).get().sort();

    let antonyms = $('div.list-holder ul li a span.text');
    antonyms = antonyms.map(function() {
        return $(this).text();
    }).get().sort();

    return {
        synonyms: synonyms,
        antonyms: antonyms
    };
}

exports.search = search;
