const { fetchLink } = require('../utils/workspace.js');
const { pwReset } = require('../config/endpoints.js');
const { getBaseSubscriptionConfig } = require('../lib/subscriptions.js');
const UserDetails = require('../lib/event-data/UserDetails');

const { transform, outputFields } = UserDetails;
const sample = UserDetails.sample.output();

// just resolves the current/authenticated user for use as a sample
const performList = async (z, bundle) => {
    const response = await fetchLink('resolve_me', z, bundle);
    return [transform(response.data)];
};

// find a particular user by name (or other search criteria)
const performSearch = async (z, bundle) => {
    const response = await fetchLink('user_search', z, bundle, {
        additionalPath: `/${bundle.inputData.name}`
    });

    return response.data.Items.map(transform);
};

// creates a new user
const performCreate = async (z, bundle) => {
    const response = await fetchLink('create_user', z, bundle, {
        additionalPath: `?success=${bundle.authData.site}${pwReset}`,
        body: {
            ...bundle.inputData
        }
    });
    return transform(response.data);
};

module.exports = {
    // see here for a full list of available properties:
    // https://github.com/zapier/zapier-platform/blob/master/packages/schema/docs/build/schema.md#resourceschema
    key: 'user',
    noun: 'User',

    // If `get` is defined, it will be called after a `search` or `create`
    // useful if your `searches` and `creates` return sparse objects
    // get: {
    //   display: {
    //     label: 'Get User',
    //     description: 'Gets a user.'
    //   },
    //   operation: {
    //     inputFields: [
    //       {key: 'id', required: true}
    //     ],
    //     perform: defineMe
    //   }
    // },

    hook: {
        display: {
            label: 'New User',
            description: 'Triggers when a new user account is created.'
        },
    
        operation: {
            type: 'hook',
        
            perform: (z, bundle) => [transform(bundle.cleanedRequest.Data)],
            performList,
            ...getBaseSubscriptionConfig('user', 'created'),
    
            sample,
            outputFields
        }
    },

    search: {
        display: {
            label: 'Find User',
            description: 'Finds a user.'
        },
        operation: {
            inputFields: [
                {key: 'name', required: true}
            ],
            perform: performSearch
        },
    },

    create: {
        display: {
            label: 'Create User',
            description: 'Creates a new user.'
        },
        operation: {
            inputFields: [
                { key: 'Username', label: 'Username', required: true },
                { key: 'Email', required: true },
                { key: 'Realname', label: 'Real Name', required: true },
            ],
            perform: performCreate
        },
    },

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    // In this resource, the sample is reused across all methods
    sample,

    // If fields are custom to each user (like spreadsheet columns), `outputFields` can create human labels
    // For a more complete example of using dynamic fields see
    // https://github.com/zapier/zapier-platform/tree/master/packages/cli#customdynamic-fields
    // Alternatively, a static field definition can be provided, to specify labels for the fields
    // In this resource, these output fields are reused across all resources
    outputFields,
};
