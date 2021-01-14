const { events, objects } = require('./types');

const base = '/dataserver2';
const e = path => `${base}${path}`;

const users = e`/users`;
const subscribe = e`/zapier/subscriptions`;
const resolveMe = e`/zapier/resolve_me`;

/*
    // mappings of object.event: path for each permutation of object and event, e.g.
{
    user: {
        created: '/dataserver2/zapier/subscriptions/user/created',
        deactivated: '/dataserver2/zapier/subscriptions/user/deactivated',
        ...etc
    },
    course: {
        ...
    }
}
*/
const triggers = Object.entries(objects).reduce((acc, [type, path]) => ({
    ...acc,
    [type]: Object.entries(events).reduce((bcc, [event, eventPath]) => ({
        ...bcc,
        [event]: `${subscribe}/${path}/${eventPath}`
    }), {})
}), {});

module.exports = {
    triggers,
    users,
    resolveMe,
    getSubscriptionPath: (objectType, event) => `${subscribe}/${objectType}/${event}`
};
