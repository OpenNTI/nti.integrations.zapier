const { service } = require('../config/endpoints');
const { headers } = require('../config/request');

async function getService (z, bundle) {
    const result = await z.request({
        method: 'GET',
        url: `${bundle.authData.site}${service}`,
        headers,
    });
    z.console.log(result.data);
    return result.data;
}

async function getWorkspace (z, bundle) {
    const service = await getService(z, bundle);
    const workspace = service.Items.find(({Title}) => Title === 'zapier');
    z.console.log(workspace);
    return workspace;
}

async function getLink (rel, z, bundle) {
    const w = await getWorkspace(z, bundle);
    return w.Links.find(link => link.rel === rel);
}

async function fetchLink (rel, z, bundle) {
    const { href, method = 'GET' } = await getLink( rel, z, bundle );
    return z.request({
        method,
        url: `${bundle.authData.site}${href}`,
        headers,
    });
}

module.exports = {
    fetchLink
};
