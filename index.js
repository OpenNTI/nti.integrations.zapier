const user = require("./triggers/user");

const userResource = require("./resources/user");

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
    connectionLabel: '{{username}} - {{email}}', // displayed in zapier UI; fields returned by the test function
    test: (z, bundle) => {
      // TODO
      return new Promise(resolve => {
        setTimeout(() => resolve({
          username: 'testuser',
          email: 'testuser@testuser.com'
        }), 500);
      })
    }
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
    user
  },

  // If you want your searches to show up, you better include it here!
  searches: {},

  // If you want your creates to show up, you better include it here!
  creates: {},

  resources: {
    [userResource.key]: userResource
  },
};
