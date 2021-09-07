const { getBaseSubscriptionConfig } = require('../../lib/subscriptions.js');

const { noun, key } = require('./constants.js');

const sample = {
    // Course
    CourseId: 'tag:nextthought.com,2011-10:NTI-CourseInfo-0000000000000000000_0000000000000000000',
    CourseTitle: 'Zapier Test Course 001',
    ProviderId: 'ZT-001',
    Description: 'This is the course description',
    RichDescription: 'This is the rich course description',
    StartDate: '2021-08-25T19:32:59Z',
    EndDate: '2021-08-25T19:32:59Z',

    // User
    Username: 'jane.doe',
    Email: 'student@domain.com',
    Realname: 'Jane Doe',
    NonI18NFirstName: 'Jane',
    NonI18NLastName: 'Doe',
};

const perform = (z, bundle) => {
    z.console.log('PERFORM:');
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
            ProviderId,
            Description,
            RichDescription,
            StartDate,
            EndDate
        } = {},
        Scope,
    } = bundle.cleanedRequest.Data;

    return [{
        Username,
        Email,
        Realname,
        NonI18NFirstName,
        NonI18NLastName,
        CourseTitle,
        CourseId,
        ProviderId,
        Description,
        RichDescription,
        StartDate,
        EndDate,
        Scope
    }];
};

module.exports = {
    key: key`enrolled`,
    noun,

    display: {
        label: 'User Enrolled',
        description: 'Triggers when a user enrolls in a course.'
    },

    operation: {
        type: 'hook',
    
        perform,
        performList: async () => ([sample]),

        ...getBaseSubscriptionConfig(noun, 'enrolled'),

        sample,

        outputFields: [
            { key: 'Username' },
            { key: 'Email' },
            { key: 'Realname', label: 'Real Name' },
            { key: 'NonI18NFirstName', label: 'First Name' },
            { key: 'NonI18NLastName', label: 'Last Name' },
            { key: 'CourseTitle', label: 'Course Title' },
            { key: 'CourseId', label: 'Course ID' },
            { key: 'ProviderId', label: 'Course Provider ID' },
            { key: 'Description', label: 'Course Description' },
            { key: 'StartDate', label: 'Start Date' },
            { key: 'EndDate', label: 'End Date' },
            { key: 'Scope' },
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
    Scope: 'ForCredit' // One of Public, Purchased, ForCredit, ForCreditDegree, or ForCreditNonDegree
}
*/
