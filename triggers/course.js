const { getBaseSubscriptionConfig } = require('../lib/subscriptions.js');
// {
// 	"Class": "CourseCreatedEvent",
// 	"Data": {
// 		"Class": "CourseDetails",
// 		"CreatedTime": "2021-08-25T19:32:59Z",
// 		"Description": "",
// 		"EndDate": null,
// 		"Id": "tag:nextthought.com,2011-10:NTI-CourseInfo-6970598910961723944_4744623187884550321",
// 		"Last Modified": "2021-08-25T19:32:59Z",
// 		"MimeType": "application/vnd.nextthought.zapier.coursedetails",
// 		"ProviderId": "ZT-001",
// 		"RichDescription": "Testing zapier trigger",
// 		"StartDate": null,
// 		"Title": "Zapier Test Course 001"
// 	},
// 	"EventType": "course.created",
// 	"MimeType": "application/vnd.nextthought.zapier.event.coursecreated"
// }


// progressUpdated: {
//     User: {
//         Class: '',
//         MimeType: '',
//         Username: '',
//         Email: '',
//         Realname: '',
//         NonI18NFirstName: '',
//         NonI18NLastName: '',
//         CreatedTime: '',
//         LastLogin: '',
//         LastSeen: '',
//     },
//     Course: {
//         Id: '',
//         ProviderId: '',
//         Title: '',
//         Description: '',
//         StartDate: '',
//         EndDate: '',
//     },
//     Progress: {
//         AbsoluteProgress: 10, // number of items completed
//         MaxPossibleProgress: 50, // total completable items in the course
//         PercentageProgress: 20, // percentage of items completed for the course
//     }
// }

const sampleData = {
    created: {
        'Id': 'tag:nextthought.com,2011-10:NTI-CourseInfo-0000000000000000000_0000000000000000000',
        'Title': 'Zapier Test Course 001',
        'ProviderId': 'ZT-001',
        'Description': '',
        'RichDescription': 'Testing zapier trigger',
        'StartDate': '2021-08-25T19:32:59Z',
        'EndDate': '2021-08-25T19:32:59Z',
        'CreatedTime': '2021-08-25T19:32:59Z',
        'Last Modified': '2021-08-25T19:32:59Z',
    },
    progressUpdated: {
        Username: 'jane.doe',
        Email: 'student@domain.com',
        CourseId: 'tag:nextthought.com,2011-10:NTI-CourseInfo-0000000000000000000_0000000000000000000',
        CourseTitle: 'Zapier Test Course 001',
        Realname: 'Jane Doe',
        NonI18NFirstName: 'Jane',
        NonI18NLastName: 'Doe',
        AbsoluteProgress: 10.1, // number of items completed
        MaxPossibleProgress: 50, // total completable items in the course
        PercentageProgress: 20, // percentage of items completed for the course
    }
};

const noun = 'course';

const key = x => `${noun}_${x}`;

const perform = (z, bundle) => {
    z.console.log('PERFORM:');
    z.console.log(JSON.stringify(bundle, null, 3));
    return [{
        ...bundle.cleanedRequest.Data
    }];
};

const created = {
    key: key`create`,
    noun,

    display: {
        label: 'Course Created',
        description: 'Triggers when a new course is created.'
    },

    operation: {
        type: 'hook',
    
        perform,
        performList: async () => ([sampleData.created]),

        ...getBaseSubscriptionConfig(noun, 'created'),

        sample: sampleData.created,

        outputFields: [
            { key: 'Id', label: 'Course ID' },
            { key: 'CreatedTime', label: 'Created Time' },
            { key: 'ProviderId', label: 'Provider ID' },
            { key: 'Title' },
            { key: 'Description' },
            { key: 'RichDescription', label: 'Description (Rich Text)' },
            { key: 'StartDate', label: 'Start Date' },
            { key: 'EndDate', label: 'End Date' },
        ]
    }
};

// https://github.com/NextThought/nti.app.products.zapier/blob/master/docs/initial_api.rst#course-progress-updated
const progressUpdated = {
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

        performList: async () => ([sampleData.progressUpdated]),

        ...getBaseSubscriptionConfig(noun, 'progress_updated'),

        sample: sampleData.progressUpdated,

        outputFields: [
            { key: 'UserId', label: 'User ID' },
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



// const performList = async (z, bundle) => {
//     const result = await z.request({
//         method: 'GET',
//         url: `${bundle.authData.site}${resolveMe}`,
//         headers,
//     });

//     const {
//         id,
//         providerId,
//         title,
//         description,
//         startDate,
//         endDate,
//     } = result.data;

//     return [{
//         id,
//         providerId,
//         title,
//         description,
//         startDate,
//         endDate,
//     }];
// };

module.exports = {
    [created.key]: created,
    [progressUpdated.key]: progressUpdated
};
