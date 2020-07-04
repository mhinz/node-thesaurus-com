const request = require('sync-request');
const cheerio = require('cheerio');

function search(query) {
    const url = 'https://www.thesaurus.com/browse/' + encodeURIComponent(query);
    const req = request('GET', url);

    if (req.statusCode !== 200) {
        return {synonyms: [], antonyms: []};
    }

    const $ = cheerio.load(req.getBody(), { ignoreWhitespace: true });

    let synonyms = $('body #loadingContainer #root div section div *:contains("Synonyms ")').parent().find('ul li span a');
    synonyms = synonyms.map(function() {
        return $(this).text();
    }).get().sort();

    let antonyms = $('body #loadingContainer #root div section div *:contains("Antonyms ")').parent().find('ul li span a');
    antonyms = antonyms.map(function() {
        return $(this).text();
    }).get().sort();

    return {
        synonyms: Array.from(new Set(synonyms)),
        antonyms: Array.from(new Set(antonyms)),
    };
}

exports.search = search;
