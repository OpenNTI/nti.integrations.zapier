const { fetchLink } = require('../utils/workspace.js');
const CourseDetails = require('../lib/event-data/CourseDetails');

// https://github.com/NextThought/nti.app.products.zapier/blob/master/docs/initial_api.rst#search-course

const {transform, outputFields} = CourseDetails;
const sample = CourseDetails.sample.output();

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
            return response.data.Items.map(transform);
        },

        sample,
        outputFields,
    },
};
