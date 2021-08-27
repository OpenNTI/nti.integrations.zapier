const { getBaseSubscriptionConfig } = require('../../lib/subscriptions.js');

const { noun, key } = require('./constants');

const sample = {
    CourseTitle: 'Zapier Test Course 001',
    CourseId: 'tag:nextthought.com,2011-10:NTI-CourseInfo-0000000000000000000_0000000000000000000',
    Username: 'jane.doe',
    Email: 'student@domain.com',
    Realname: 'Jane Doe',
    NonI18NFirstName: 'Jane',
    NonI18NLastName: 'Doe',
    AbsoluteProgress: 10.1, // number of items completed
    MaxPossibleProgress: 50, // total completable items in the course
    PercentageProgress: 0.202, // percentage of items completed for the course
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
            z.console.log(JSON.stringify(bundle, null, 3));
            const {
                User: {
                    Username,
                    Email,
                    Realname,
                    NonI18NFirstName,
                    NonI18NLastName,
                } = {},
                Course: {
                    Id: CourseId,
                    Title: CourseTitle,
                } = {},
                Progress: {
                    AbsoluteProgress,
                    MaxPossibleProgress,
                    PercentageProgress,
                } = {}
            } = bundle.cleanedRequest.Data;

            return [{
                Username,
                Email,
                Realname,
                NonI18NFirstName,
                NonI18NLastName,
                CourseId,
                CourseTitle,
                AbsoluteProgress,
                MaxPossibleProgress,
                PercentageProgress,
            }];
        },

        performList: async () => ([sample]),

        ...getBaseSubscriptionConfig(noun, 'progress_updated'),
        
        sample,
        
        outputFields: [
            { key: 'Username' },
            { key: 'Email' },
            { key: 'CourseId', label: 'Course ID' },
            { key: 'CourseTitle', label: 'Course Title' },
            { key: 'Realname', label: 'Real Name' },
            { key: 'NonI18NFirstName', label: 'First Name' },
            { key: 'NonI18NLastName', label: 'Last Name' },
            { key: 'AbsoluteProgress', label: 'Absolute Progress', type: 'number' },
            { key: 'MaxPossibleProgress', label: 'Max Possible Progress', type: 'number' },
            { key: 'PercentageProgress', label: 'Percentage Progress', type: 'number' },
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
    }
}
*/
