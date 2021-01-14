const { triggers, resolveMe } = require('../config/endpoints');
const { headers } = require('../config/request');

const performSubscribe = {
    method: 'POST',
    url: `{{bundle.authData.site}}${triggers.user.created}`,
    headers,
    body: {
        target: '{{bundle.targetUrl}}'
    }
};

const performUnsubscribe = {
    method: 'DELETE',
    url: '{{bundle.authData.site}}{{bundle.subscribeData.href}}',
    headers,
};

const perform = (z, bundle) => {
    z.console.log('PERFORM:');
    z.console.log(JSON.stringify(bundle, null, 3));
    return [{
        ...bundle.cleanedRequest.Data
    }];
};

const performList = async (z, bundle) => {
    const result = await z.request({
        method: 'GET',
        url: `${bundle.authData.site}${resolveMe}`,
        headers,
    });

    const {
        CreatedTime,
        Email,
        LastLogin,
        Realname,
        Username,
    } = result.data;

    return [{
        CreatedTime,
        Email,
        LastLogin,
        Realname,
        Username,
    }];
};

module.exports = {
    key: 'user',
    noun: 'User',

    display: {
        label: 'New User',
        description: 'Triggers when a new user account is created.'
    },

    operation: {
        type: 'hook',
    
        perform,
        performList,
        performSubscribe,
        performUnsubscribe,

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
};
