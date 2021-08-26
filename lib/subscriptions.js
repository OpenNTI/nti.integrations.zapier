const { headers } = require('../config/request');
const { getSubscriptionPath } = require('../config/endpoints');

/**
 * 
 * @param {string} resource - The resource name, e.g. 'user', 'course', etc.
 * @param {string} type - The type of event, e.g. 'created', 'deleted', etc.
 * @returns {Object} - Returns an object with subscription methods/configs common across NextThought resources
 */
function getBaseSubscriptionConfig(resource, type) {
    return {
        performSubscribe: {
            method: 'POST',
            url: `{{bundle.authData.site}}${getSubscriptionPath(resource, type)}`,
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
    };
}

module.exports = {
    getBaseSubscriptionConfig
};
