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
            // z?.console?.log(JSON.stringify(bundle.cleanedRequest, null, 3));
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
  "Class": "UserProgressUpdatedEvent",
  "Data": {
    "Class": "ProgressSummary",
    "Course": {
      "Class": "CourseDetails",
      "CreatedTime": "2021-09-15T19:17:58Z",
      "Description": "",
      "EndDate": null,
      "Id": "tag:nextthought.com,2011-10:NTI-CourseInfo-740963213872267802_4744630794249276970",
      "Last Modified": "2021-09-15T19:18:10Z",
      "MimeType": "application/vnd.nextthought.zapier.coursedetails",
      "ProviderId": "zappier_course",
      "RichDescription": "",
      "StartDate": null,
      "Title": "zappier course"
    },
    "MimeType": "application/vnd.nextthought.zapier.progresssummary",
    "Progress": {
      "AbsoluteProgress": 2,
      "Class": "CompletionContextProgressDetails",
      "Completed": false,
      "MaxPossibleProgress": 3,
      "MimeType": "application/vnd.nextthought.zapier.completioncontextprogressdetails",
      "PercentageProgress": 0.6666666666666666,
      "Success": false
    },
    "User": {
      "Class": "UserDetails",
      "CreatedTime": "2021-09-15T20:04:22Z",
      "Email": "julie.zhu+zap03@nextthought.com",
      "LastLogin": "2021-09-15T20:04:23Z",
      "LastSeen": "2021-09-15T20:04:23Z",
      "MimeType": "application/vnd.nextthought.zapier.userdetails",
      "NonI18NFirstName": "Zap",
      "NonI18NLastName": "Tester03",
      "Realname": "Zap Tester03",
      "Username": "zap.alpha.tester03"
    }
  },
  "EventType": "course.progress_updated",
  "MimeType": "application/vnd.nextthought.zapier.event.userprogressupdated"
}*/
