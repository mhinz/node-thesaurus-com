const request = require('sync-request');
const cheerio = require('cheerio');

function search(query) {
    const url = 'http://www.thesaurus.com/browse/' + encodeURIComponent(query);
    const req = request('GET', url);

    if (req.statusCode !== 200) {
        return {synonyms: [], antonyms: []};
    }

    const $ = cheerio.load(req.getBody(), { ignoreWhitespace: true });

    let synonyms = $('body #loadingContainer #root div section div h2:contains("Synonyms ")').parent().parent().find('ul li span a');
    synonyms = synonyms.map(function() {
        return $(this).text();
    }).get().sort();

    let antonyms = $('body #loadingContainer #root div section div h2:contains("Antonyms ")').parent().parent().find('ul li span a');
    antonyms = antonyms.map(function() {
        return $(this).text();
    }).get().sort();

    return {
        synonyms: synonyms,
        antonyms: antonyms
    };
}

exports.search = search;
