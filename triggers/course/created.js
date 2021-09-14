const { getBaseSubscriptionConfig } = require('../../lib/subscriptions.js');
const CourseDetails = require('../../lib/event-data/CourseDetails');
const { noun, key } = require('./constants.js');

const perform = (z, bundle) => {
    z.console.log('PERFORM:');
    z.console.log(JSON.stringify(bundle, null, 3));
    return [{
        ...bundle.cleanedRequest.Data
    }];
};

const { outputFields } = CourseDetails;
const sample = CourseDetails.sample.dataserver();

module.exports = {
    key: key`create`,
    noun,

    display: {
        label: 'Course Created',
        description: 'Triggers when a new course is created.'
    },

    operation: {
        type: 'hook',
    
        perform,
        performList: async () => ([sample]),

        ...getBaseSubscriptionConfig(noun, 'created'),

        sample,
        outputFields
    }
};

/*
{
	"Class": "CourseCreatedEvent",
	"Data": {
		"Class": "CourseDetails",
		"CreatedTime": "2021-08-25T19:32:59Z",
		"Description": "",
		"EndDate": null,
		"Id": "tag:nextthought.com,2011-10:NTI-CourseInfo-6970598910961723944_4744623187884550321",
		"Last Modified": "2021-08-25T19:32:59Z",
		"MimeType": "application/vnd.nextthought.zapier.coursedetails",
		"ProviderId": "ZT-001",
		"RichDescription": "Testing zapier trigger",
		"StartDate": null,
		"Title": "Zapier Test Course 001"
	},
	"EventType": "course.created",
	"MimeType": "application/vnd.nextthought.zapier.event.coursecreated"
}
*/
