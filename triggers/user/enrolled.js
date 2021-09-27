const { getBaseSubscriptionConfig } = require('../../lib/subscriptions.js');
const flatten = require('../../lib/event-data/utils/flatten');

const { noun, key } = require('./constants.js');
const UserEnrolledEvent = require('../../lib/event-data/UserEnrolledEvent.js');

const sample = UserEnrolledEvent.sample.output();

module.exports = {
    key: key`enrolled`,
    noun,

    display: {
        label: 'User Enrolled',
        description: 'Triggers when a user enrolls in a course.'
    },

    operation: {
        type: 'hook',
    
        perform: (z, bundle) => [flatten(bundle.cleanedRequest.Data)],
        performList: async () => ([sample]),

        ...getBaseSubscriptionConfig(noun, 'enrolled'),

        sample,

        outputFields: UserEnrolledEvent.outputFields
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
