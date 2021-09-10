const { service } = require('../config/endpoints');
const { headers } = require('../config/request');

async function getService (z, bundle) {
    const result = await z.request({
        method: 'GET',
        url: `${bundle.authData.site}${service}`,
        headers,
    });
    return result.data;
}

async function getWorkspace (z, bundle) {
    const service = await getService(z, bundle);
    const workspace = service.Items.find(({Title}) => Title === 'zapier');
    return workspace;
}

async function getLink (rel, z, bundle) {
    const w = await getWorkspace(z, bundle);
    return w.Links.find(link => link.rel === rel);
}

async function fetchLink (rel, z, bundle, { additionalPath = '', ...options } = {}) {
    const { href, method = 'GET' } = await getLink( rel, z, bundle );
    const params = bundle.inputData;

    return z.request({
        method,
        url: `${bundle.authData.site}${href}${additionalPath}`,
        headers,
        params,
        ...options
    });
}

module.exports = {
    fetchLink
};
