const { fetchLink } = require('../utils/workspace');
const { headers } = require('../config/request');
const { triggers } = require('../config/endpoints');

// just resolves the current/authenticated user for use as a sample
const performList = async (z, bundle) => {
    const response = await fetchLink('resolve_me', z, bundle);

    const {
        CreatedTime,
        Email,
        LastLogin,
        Realname,
        Username,
    } = response.data;

    return [{
        CreatedTime,
        Email,
        LastLogin,
        Realname,
        Username,
    }];
};

// find a particular user by name (or other search criteria)
const performSearch = async (z, bundle) => {
    const response = await fetchLink('user_search', z, bundle, {
        additionalPath: `/${bundle.inputData.name}`
    });

    return response.data.Items;
};

// creates a new user
const performCreate = async (z, bundle) => {
    const response = fetchLink('create_user', z, bundle, {
        body: {
            name: bundle.inputData.name // json by default
        }
    });
    return response.data;
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
        
            perform: (z, bundle) => {
                // z.console.log('PERFORM:');
                // z.console.log(JSON.stringify(bundle, null, 3));
                return [{
                    ...bundle.cleanedRequest.Data
                }];
            },
            performList,
            performSubscribe: {
                method: 'POST',
                url: `{{bundle.authData.site}}${triggers.user.created}`,
                headers,
                body: {
                    target: '{{bundle.targetUrl}}'
                }
            },
            performUnsubscribe: {
                method: 'DELETE',
                url: '{{bundle.authData.site}}{{bundle.subscribeData.href}}',
                headers,
            },
    
            sample: {
                'CreatedTime': '2020-12-16T17:57:26Z',
                'Email': 'john.smith@somedomain.com',
                'LastLogin': '2021-01-13T16:05:23Z',
                'Realname': 'John Smith',
                'Username': 'johnsmith'
            },
    
            outputFields: [
                { key: 'CreatedTime', label: 'Created Time' },
                { key: 'LastLogin', label: 'Last Log In' },
                { key: 'Email', label: 'email' },
                { key: 'Username', label: 'Username' },
                { key: 'Realname', label: 'Name' },
            ]
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
                { key: 'Username', label: 'Username' },
                { key: 'realname', label: 'Real Name' },
                { key: 'NonI18NFirstName', label: 'First Name' },
                { key: 'NonI18NLastName', label: 'Last Name' },
                {key: 'name', required: true}
            ],
            perform: performCreate
        },
    },

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    // In this resource, the sample is reused across all methods
    sample: {
        'CreatedTime': '2020-11-11T19:22:58Z',
        'Email': 'john.doe@example.com',
        'LastLogin': '2021-01-13T20:42:44Z',
        'Realname': 'John Doe',
        'Username': 'john.doe',
    },

    // If fields are custom to each user (like spreadsheet columns), `outputFields` can create human labels
    // For a more complete example of using dynamic fields see
    // https://github.com/zapier/zapier-platform/tree/master/packages/cli#customdynamic-fields
    // Alternatively, a static field definition can be provided, to specify labels for the fields
    // In this resource, these output fields are reused across all resources
    outputFields: [
        { key: 'CreatedTime', label: 'Created Time' },
        { key: 'LastLogin', label: 'Last Login' },
        { key: 'Realname', label: 'Real Name' },
    ]
};
