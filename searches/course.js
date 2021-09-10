const { fetchLink } = require('../utils/workspace.js');

// https://github.com/NextThought/nti.app.products.zapier/blob/master/docs/initial_api.rst#search-course

module.exports = {
    key: 'course',

    noun: 'Course',
    display: {
        label: 'Find a Course',
        description: 'Search for courses.',
    },

    operation: {
        inputFields: [
            {
                key: 'filter',
                type: 'string',
                label: 'Filter',
                helpText: 'Search for matches by Title, ProviderId and tags.',
            },
        ],

        perform: async (z, bundle) => {
            const response = await fetchLink('course_search', z, bundle);
            z.console.log(response.data);
            return response.data.Items;
        },

        // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
        // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
        // returned records, and have obviously dummy values that we can show to any user.
        sample: {
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
    },
};