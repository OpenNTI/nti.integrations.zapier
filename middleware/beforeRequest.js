const { base } = require('../config/endpoints');

module.exports = [
    (request) => {
        // removes double slash in cases where the base site url (bundle.authData.site) includes a trailing slash
        request.url = request.url.replace(`/${base}`, base);
        return request;
    }
];
