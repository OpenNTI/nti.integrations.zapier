const { fetchLink } = require('../../utils/workspace.js');
const makeTransformer = require('./utils/make-transformer.js');

const MimeType = 'application/vnd.nextthought.zapier.userdetails';

const dataserverSample = {
    MimeType,
    Username: 'jane.doe',
    Email: 'student@domain.com',
    Realname: 'Jane Doe',
    NonI18NFirstName: 'Jane',
    NonI18NLastName: 'Doe',
    LastLogin: '2021-08-25T19:32:59Z',
    LastSeen: '2021-08-25T21:32:59Z',
    CreatedTime: '2021-08-25T21:32:59Z',
};

const outputFields = [
    { key: 'Username' },
    { key: 'Email' },
    { key: 'Realname', label: 'Real Name' },
    { key: 'NonI18NFirstName', label: 'First Name' },
    { key: 'NonI18NLastName', label: 'Last Name' },
    { key: 'LastLogin', label: 'Last Login' },
    { key: 'LastSeen', label: 'Last Seen' },
    { key: 'CreatedTime', label: 'Created Time' },
];

// returns an object with only the fields specified by outputFields,
const transform = makeTransformer(outputFields);

module.exports = {
    MimeType,
    handles: obj => obj?.MimeType === MimeType,
    transform,
    performList: async (z, bundle) => {
        const response = await fetchLink('user_search', z, bundle, { params: { batchSize: 3, batchStart: 0 }});
        return response.data.Items.map(transform);
    },
    sample: {
        dataserver: () => dataserverSample,
        output: () => transform(dataserverSample)
    },
    outputFields
};
