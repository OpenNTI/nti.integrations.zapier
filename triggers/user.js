const { triggers, users } = require('../config/endpoints');
const { headers } = require('../config/request');
const { UserCreated } = require('../config/types');

const performSubscribe = {
    method: 'POST',
    url: `{{bundle.authData.site}}${triggers.user.created}`,
    headers,
    body: {
        target: '{{bundle.targetUrl}}'
    }
}

const performUnsubscribe = {
    method: 'DELETE',
    url: '{{bundle.authData.site}}{{bundle.subscribeData.href}}',
    headers,
}

const perform = (z, bundle) => {
    z.console.log('PERFORM:');
    z.console.log(JSON.stringify(bundle, null, 3));
    return [{
        ...bundle.cleanedRequest.data
    }];
}

const performList = async (z, bundle) => {
    const result = await z.request({
        method: 'GET',
        url: `{{bundle.authData.site}}${users}/{{bundle.authData.username}}`,
        headers,
    });

    const {
        CreatedTime,
        email,
        realname: name,
        lastLoginTime: last_login,
        Username: username,
    } = result.data;

    return [{
        CreatedTime,
        email,
        last_login,
        name,
        username,
    }];
}

module.exports = {
    key: 'user',
    noun: 'User',

    display: {
        label: 'New User',
        description: 'Triggered when a new user account is created.'
    },

    operation: {
        type: 'hook',
    
        perform,
        performList,
        performSubscribe,
        performUnsubscribe,

        sample: {
            "CreatedTime": "2020-12-16T17:57:26Z",
            "email": "john.smith@somedomain.com",
            "last_login": "1608141448.001122",
            "name": "John Smith",
            "username": "johnsmith"
        },

        outputFields: [
            { key: 'CreatedTime', label: 'Created Time' },
            { key: 'last_login', label: 'Last Log In' },
            { key: 'email', label: 'email' },
            { key: 'username', label: 'Username' },
            { key: 'name', label: 'Name' },
        ]
    }
}
