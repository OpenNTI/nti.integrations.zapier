/* globals describe, expect, it */

const { users } = require('../../config/endpoints');
const beforeRequest = require('../beforeRequest');

describe('beforeRequest', () => {
    it('strips double slashes from api url', () => {
        const req = beforeRequest.reduce((acc, fn) => fn(acc), {url: `https://foo.com/${users}`});

        // only occurrence of double slash should be in protocol (http://)
        expect(req.url.match(/\/\//g)).toHaveLength(1);
    });
});
