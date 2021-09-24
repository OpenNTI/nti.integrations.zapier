const { getBaseSubscriptionConfig } = require('../../lib/subscriptions.js');

const flatten = require('../../lib/event-data/utils/flatten');

const CourseDetails = require('../../lib/event-data/CourseDetails');
const UserDetails = require('../../lib/event-data/UserDetails');
const ProgressDetails = require('../../lib/event-data/ProgressDetails');

const { noun, key } = require('./constants');

const sample = {
    ...CourseDetails.sample.output(),
    ...UserDetails.sample.output(),
    ...ProgressDetails.sample.output(),
};

// https://github.com/NextThought/nti.app.products.zapier/blob/master/docs/initial_api.rst#course-progress-updated

module.exports = {
    key: key`progress_updated`,
    noun,

    display: {
        label: 'Course Progress Updated',
        description: 'Triggers when users complete items in a course.'
    },

    operation: {
        type: 'hook',
    
        perform: (z, bundle) => {
            // z?.console?.log(JSON.stringify(bundle, null, 3));
            return [flatten(bundle.cleanedRequest.Data)];
        },

        performList: async () => ([sample]),

        ...getBaseSubscriptionConfig(noun, 'progress_updated'),
        
        sample,
        
        outputFields: [
            ...CourseDetails.outputFields,
            ...UserDetails.outputFields,
            ...ProgressDetails.outputFields
        ]
    }
};

/*
{
    User: {
        Class: '',
        MimeType: '',
        Username: '',
        Email: '',
        Realname: '',
        NonI18NFirstName: '',
        NonI18NLastName: '',
        CreatedTime: '',
        LastLogin: '',
        LastSeen: '',
    },
    Course: {
        Id: '',
        ProviderId: '',
        Title: '',
        Description: '',
        StartDate: '',
        EndDate: '',
    },
    Progress: {
        AbsoluteProgress: 10, // number of items completed
        MaxPossibleProgress: 50, // total completable items in the course
        PercentageProgress: 0.202, // percentage of items completed for the course
        Completed: false,
        Success: false,
    }
}
*/
