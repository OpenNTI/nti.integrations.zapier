const user = require('./triggers/user');
// const course = require("./triggers/course");

const userResource = require('./resources/user');

const { headers } = require('./config/request');
const { users } = require('./config/endpoints');

module.exports = {
    // This is just shorthand to reference the installed dependencies you have.
    // Zapier will need to know these before we can upload.
    version: require('./package.json').version,
    platformVersion: require('zapier-platform-core').version,

    authentication: {
        type: 'basic',
        fields: [
            {
                key: 'site',
                label: 'Site URL',
                required: true,
                placeholder: 'https://mysite.nextthought.com',
                helpText: 'Enter the url you use to access the [NextThought](https://nextthought.com) platform.'
            }
        ],
        connectionLabel: '{{site}} - {{username}}', // displayed in zapier UI; fields returned by the test function
        test: async (z, bundle) => {
            const { authData: {site, username} } = bundle;
            const result = await z.request({
                url: `${site}${users}/${username}`,
                headers
            });
            return result.data;
        }
    },

    // If you want your trigger to show up, you better include it here!
    triggers: {
        user,
    // ...course
    },

    // If you want your searches to show up, you better include it here!
    searches: {},

    // If you want your creates to show up, you better include it here!
    creates: {},

    resources: {
        [userResource.key]: userResource
    },
};
