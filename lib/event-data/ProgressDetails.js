const makeTransformer = require('./utils/make-transformer.js');

const MimeType = 'application/vnd.nextthought.zapier.progressdetails';

const dataserverSample = {
    MimeType,
    Username: 'jane.doe',
    Email: 'student@domain.com',
    Realname: 'Jane Doe',
    NonI18NFirstName: 'Jane',
    NonI18NLastName: 'Doe',
    LastLogin: '2021-08-25T19:32:59Z',
    LastSeen: '2021-08-25T21:32:59Z',
};

const outputFields = [
    { key: 'AbsoluteProgress', label: 'Absolute Progress', type: 'number' },
    { key: 'MaxPossibleProgress', label: 'Max Possible Progress', type: 'number' },
    { key: 'PercentageProgress', label: 'Percentage Progress', type: 'number' },
    { key: 'Completed', type: 'boolean' },
    { key: 'Success', type: 'boolean' },
];

// returns an object with only the fields specified by outputFields
const transform = makeTransformer(outputFields);

module.exports = {
    MimeType,
    handles: obj => obj?.MimeType === MimeType,
    transform,
    sample: {
        dataserver: () => dataserverSample,
        output: () => transform(dataserverSample)
    },
    outputFields
};
