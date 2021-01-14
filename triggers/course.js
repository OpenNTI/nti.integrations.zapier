const { getSubscriptionPath } = require('../config/endpoints');
const { headers } = require('../config/request');

const noun = 'course';

const key = x => `${noun}_${x}`;

const perform = (z, bundle) => {
    z.console.log('PERFORM:');
    z.console.log(JSON.stringify(bundle, null, 3));
    return [{
        ...bundle.cleanedRequest.Data
    }];
};

const subscriptions = type => {
    return {
        performSubscribe: {
            method: 'POST',
            url: `{{bundle.authData.site}}${getSubscriptionPath(noun, type)}`,
            headers,
            body: {
                target: '{{bundle.targetUrl}}'
            }
        },

        performUnsubscribe: {
            method: 'DELETE',
            url: '{{bundle.authData.site}}{{bundle.subscribeData.href}}',
            headers,
        }
    };
};

const created = {
    key: key`create`,
    noun,

    display: {
        label: 'Course Created',
        description: 'Triggers when a new course is created.'
    },

    operation: {
        type: 'hook',
    
        perform,
        // performList,
        ...subscriptions('create'),

        sample: {
            id:	'NTIID of course instance',
            providerId: 'providerId',
            title: 'Chemistry of Beer',
            description: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
            startDate: '2021-01-13T17:57:26Z',
            endDate: '2021-04-13T17:57:26Z',
        },

        outputFields: [
            { key: 'id', label: 'The id of the course' },
            { key: 'providerId', label: 'The providerId of the course' },
            { key: 'title', label: 'The title of the course' },
            { key: 'description', label: 'The description of the course' },
            { key: 'startDate', label: 'The startDate of the course' },
            { key: 'endDate', label: 'The endDate of the course' },
        ]
    }
};



// const performList = async (z, bundle) => {
//     const result = await z.request({
//         method: 'GET',
//         url: `${bundle.authData.site}${resolveMe}`,
//         headers,
//     });

//     const {
//         id,
//         providerId,
//         title,
//         description,
//         startDate,
//         endDate,
//     } = result.data;

//     return [{
//         id,
//         providerId,
//         title,
//         description,
//         startDate,
//         endDate,
//     }];
// };

module.exports = {
    [created.key]: created
};

