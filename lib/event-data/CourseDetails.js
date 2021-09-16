const remapFields = require('./utils/remap-fields.js');

const dataserverSample = {
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

const outputFieldNames = {
    Id: 'CourseId',
    Title: 'CourseTitle'
};

const MimeType = 'application/vnd.nextthought.zapier.coursedetails';

module.exports = {
    MimeType,
    handles: obj => obj?.MimeType === MimeType,
    transform: obj => remapFields(obj, outputFieldNames),
    sample: {
        dataserver: () => dataserverSample,
        output: () => remapFields(dataserverSample, outputFieldNames)
    },
    outputFields: [
        { key: 'CourseTitle', label: 'Title' },
        { key: 'Description' },
        { key: 'RichDescription', label: 'Description (Rich Text)' },
        { key: 'CourseId', label: 'Course ID' },
        { key: 'ProviderId', label: 'Provider ID' },
        { key: 'CreatedTime', label: 'Created Time' },
        { key: 'StartDate', label: 'Start Date' },
        { key: 'EndDate', label: 'End Date' },
    ]
};
