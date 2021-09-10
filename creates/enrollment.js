const { fetchLink } = require('../utils/workspace.js');

module.exports = {
    key: 'enrollment',

    noun: 'Enrollment',
    display: {
        label: 'Enroll a User',
        description: 'Enrolls a user in a course.',
    },

    operation: {
        inputFields: [
            {
                key: 'CourseId',
                required: true,
                type: 'string',
                helpText: 'The id of the course in which to enroll the user.',
                // dynamic: 'course.id'
            },
            {
                key: 'Username',
                required: true,
                type: 'string',
                helpText: 'The username of the enrollee.',
                // dynamic: 'user.id',
            },
        ],

        perform: async (z, bundle) => {
            z.console.log(JSON.stringify(bundle, null, 2));
            const response = await fetchLink('enroll_user', z, bundle);
            z.console.log(response.data);
            const {
                Scope,
                Course: {
                    Description,
                    StartDate,
                    EndDate,
                    Title,
                    ProviderId,
                    RichDescription,
                    Id: CourseId
                },
                User: {
                    Username,
                    Email,
                    Realname,
                    NonI18NFirstName,
                    NonI18NLastName,
                } = {},
            } = response.data;

            return {
                Title,
                CourseId,
                ProviderId,
                Description,
                RichDescription,
                StartDate,
                EndDate,
                Username,
                Realname,
                Email,
                NonI18NFirstName,
                NonI18NLastName,
                Scope,
            };
        },

        // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
        // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
        // returned records, and have obviously dummy values that we can show to any user.
        sample: {
            CourseId: 'tag:nextthought.com,2011-10:NTI-CourseInfo-0000000000000000000_0000000000000000000',
            CourseTitle: 'Zapier Test Course 001',
            ProviderId: 'ZT-001',
            Description: 'This is the course description',
            RichDescription: 'This is the rich course description',
            StartDate: '2021-08-25T19:32:59Z',
            EndDate: '2021-08-25T19:32:59Z',
            Scope: 'Public',

            // User
            Username: 'jane.doe',
            Email: 'student@domain.com',
            Realname: 'Jane Doe',
            NonI18NFirstName: 'Jane',
            NonI18NLastName: 'Doe',
        },

        // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
        // field definitions. The result will be used to augment the sample.
        // outputFields: () => { return []; }
        // Alternatively, a static field definition should be provided, to specify labels for the fields
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
            { key: 'RichDescription', label: 'Course Description (Rich Text)' },
            { key: 'StartDate', label: 'Start Date' },
            { key: 'EndDate', label: 'End Date' },
            { key: 'Scope' },
        ]
    },
};

// input
// {
//     "CourseId": "tag:nextthought.com,2011-10:NTI-CourseInfo-8145718279482549434_4744539542214665237", 
//     "Username": "bh.student01"
// }

// response
// {
//     "Class": "CourseEnrollmentDetails", 
//     "Course": {
//         "Class": "CourseDetails", 
//         "CreatedTime": "1970-01-01T00:00:00Z", 
//         "Description": "", 
//         "EndDate": null, 
//         "Id": "tag:nextthought.com,2011-10:NTI-CourseInfo-8145718279482549434_4744539542214665237", 
//         "Last Modified": "2021-08-10T17:28:54Z", 
//         "MimeType": "application/vnd.nextthought.zapier.coursedetails", 
//         "ProviderId": "WAGO-1001", 
//         "RichDescription": "", 
//         "StartDate": "2021-03-23T05:00:00Z", 
//         "Title": "How to Train Your Wagon"
//     }, 
//     "MimeType": "application/vnd.nextthought.zapier.courseenrollmentdetails", 
//     "Scope": "Public", 
//     "User": {
//         "Class": "UserDetails", 
//         "CreatedTime": "2021-07-28T23:51:37Z", 
//         "Email": "bobby.hagen+bh.student01@nextthought.com", 
//         "LastLogin": "2021-08-02T22:24:15Z", 
//         "LastSeen": "2021-08-11T18:10:40Z", 
//         "MimeType": "application/vnd.nextthought.zapier.userdetails", 
//         "NonI18NFirstName": "bh.student01", 
//         "NonI18NLastName": "Test", 
//         "Realname": "bh.student01 Test", 
//         "Username": "bh.student01"
//     }
// }