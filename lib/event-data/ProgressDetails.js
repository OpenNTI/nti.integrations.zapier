const makeTransformer = require('./utils/make-transformer.js');

const MimeType = 'application/vnd.nextthought.zapier.completioncontextprogressdetails';

const dataserverSample = {
    MimeType,
    AbsoluteProgress: 10,
    MaxPossibleProgress: 50,
    PercentageProgress: 0.2, 
    Completed: false,
    Success: false
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
