const CourseDetails = require('./CourseDetails.js');
const UserDetails = require('./UserDetails.js');
const makeTransformer = require('./utils/make-transformer.js');

const MimeType = 'application/vnd.nextthought.zapier.event.userenrolled';

const outputFields = [
    { key: 'Scope' },
];

const dataserverSample = {
    Course: { ...CourseDetails.sample.dataserver() },
    User:   { ...UserDetails.sample.dataserver()   },
    Scope: 'ForCredit' // One of Public, Purchased, ForCredit, ForCreditDegree, or ForCreditNonDegree
};

const transformer = makeTransformer(outputFields);

// returns an object with only the fields specified by outputFields,
// remapping field names as appropriate according to outputFieldNames
const transform = ({ Course, User, ...other }) => {
    return ({
        ...CourseDetails.transform(Course),
        ...UserDetails.transform(User),
        ...transformer(other),
    });
};

const sampleOutput = transform(dataserverSample);

module.exports = {
    MimeType,
    handles: obj => obj?.MimeType === MimeType,
    transform,
    performList: async () => ([sampleOutput]),
    sample: {
        dataserver: () => dataserverSample,
        output: () => sampleOutput
    },
    outputFields: [
        ...CourseDetails.outputFields,
        ...UserDetails.outputFields,
        ...outputFields,
    ]
};
