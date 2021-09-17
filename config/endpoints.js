const base = '/dataserver2';
const e = path => `${base}${path}`;

const users = e`/users`;
const subscribe = e`/zapier/subscriptions`;
const resolveMe = e`/zapier/resolve_me`;
const service = e`/service`;
const pwReset = '/login/recover/reset';

module.exports = {
    base,
    service,
    users,
    pwReset,
    resolveMe,
    getSubscriptionPath: (objectType, event) => `${subscribe}/${objectType}/${event}`
};
