var assert = require('assert');
var tcom = require('./index.js');

var output_for_never = {
    synonyms: ["at no time", 'don\'t hold your breath'],
    antonyms: ["always", "forever"]
};

describe('tcom.search()', function() {
    describe('with argument "never"', function() {
        it('should return synonyms and antonyms', function() {
            let matches = tcom.search('never');
            assert.deepEqual(output_for_never.synonyms, matches.synonyms.slice(0,2));
            assert.deepEqual(output_for_never.antonyms, matches.antonyms.slice(0,2));
        });
    });

    describe('with argument "foo"', function() {
        it('should return only synonyms', function() {
            let matches = tcom.search('foo');
            assert.equal(0, matches.antonyms.length);
        });
    });

    describe('with argument "fooo"', function() {
        it('should return nothing', function() {
            let matches = tcom.search('fooo');
            assert.deepEqual({ synonyms: [], antonyms: [] }, matches);
        });
    });

    describe('with argument ""', function() {
        it('should return nothing', function() {
            let matches = tcom.search('');
            assert.deepEqual({ synonyms: [], antonyms: [] }, matches);
        });
    });
});
