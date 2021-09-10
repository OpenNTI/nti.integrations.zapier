const userResource = require('./resources/user.js');
const courseTriggers = require('./triggers/course/index.js');
const userTriggers = require('./triggers/user/index.js');
const creates = require('./creates/index.js');
const searches = require('./searches/index.js');

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
                helpText:
          'Enter the url you use to access the [NextThought](https://nextthought.com) platform.',
            },
        ],
        connectionLabel: '{{site}} - {{username}}', // displayed in zapier UI; fields returned by the test function
        test: async (z, bundle) => {
            const {
                authData: { site, username },
            } = bundle;
            const result = await z.request({
                url: `${site}${users}/${username}`,
                headers,
            });
            return result.data;
        },
    },

    resources: {
        [userResource.key]: userResource,
    },

    triggers: {
        ...courseTriggers,
        ...userTriggers,
    },

    creates,
    searches,
};
