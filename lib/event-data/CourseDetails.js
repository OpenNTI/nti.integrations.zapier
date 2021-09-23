const { fetchLink } = require('../../utils/workspace.js');
const makeTransformer = require('./utils/make-transformer.js');

const MimeType = 'application/vnd.nextthought.zapier.coursedetails';

const dataserverSample = {
    MimeType,
    Id: 'tag:nextthought.com,2011-10:NTI-CourseInfo-0000000000000000000_0000000000000000000',
    Title: 'Zapier Test Course 001',
    ProviderId: 'ZT-001',
    Description: '',
    RichDescription: 'Testing zapier trigger',
    StartDate: '2021-08-25T19:32:59Z',
    EndDate: '2021-08-25T19:32:59Z',
    CreatedTime: '2021-08-25T19:32:59Z',
    'Last Modified': '2021-08-25T19:32:59Z',
};

const outputFields = [
    { key: 'CourseTitle', label: 'Course Title' },
    { key: 'Description' },
    { key: 'RichDescription', label: 'Description (Rich Text)' },
    { key: 'CourseId', label: 'Course ID' },
    { key: 'ProviderId', label: 'Provider ID' },
    { key: 'CreatedTime', label: 'Created Time' },
    { key: 'StartDate', label: 'Start Date' },
    { key: 'EndDate', label: 'End Date' },
];

// to avoid field name collisions when flattening
// data, we rename some common fields.
// mapping of outputFieldName to originalFieldName
const outputFieldNames = {
    CourseId: 'Id',
    CourseTitle: 'Title'
};


// returns an object with only the fields specified by outputFields,
// remapping field names as appropriate according to outputFieldNames
const transform = makeTransformer(outputFields, outputFieldNames);

module.exports = {
    MimeType,
    handles: obj => obj?.MimeType === MimeType,
    transform,
    performList: async (z, bundle) => {
        const response = await fetchLink('course_search', z, bundle, { params: { batchSize: 3, batchStart: 0 }});
        return response.data.Items.map(transform);
    },
    sample: {
        dataserver: () => dataserverSample,
        output: () => transform(dataserverSample)
    },
    outputFields
};
