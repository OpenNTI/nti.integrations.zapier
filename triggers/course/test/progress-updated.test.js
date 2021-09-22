/* globals describe it expect */

const trigger = require('../progress-updated');

const Data = {
    User: {
        MimeType: 'application/vnd.nextthought.zapier.userdetails',
        Username: 'bob.smith',
        Email: 'bob.smith@test.net',
        Realname: 'Bob Smith',
        NonI18NFirstName: 'Bob',
        NonI18NLastName: 'Smith',
    },
    Course: {
        MimeType: 'application/vnd.nextthought.zapier.coursedetails',
        Id: 'some-course-id',
        Title: 'The Course Title',
        ProviderId: 'ZT-PID',
    },
    Progress: {
        MimeType: 'application/vnd.nextthought.zapier.progressdetails',
        AbsoluteProgress: 10,
        MaxPossibleProgress: 50,
        PercentageProgress: 0.2,
        Completed: false,
        Success: false,
    }
};

describe('progress-updated trigger', () => {
    it('extracts data from bundle', () => {
        const [result] = trigger.operation.perform(undefined, { cleanedRequest: { Data } });
        
        // User
        expect(result).toHaveProperty('Username', Data.User.Username);
        expect(result).toHaveProperty('Email', Data.User.Email);

        // Course
        expect(result).toHaveProperty('CourseTitle', Data.Course.Title);
        expect(result).toHaveProperty('ProviderId', Data.Course.ProviderId);

        // Progress
        expect(result).toHaveProperty('AbsoluteProgress', Data.Progress.AbsoluteProgress);
        expect(result).toHaveProperty('Completed', Data.Progress.Completed);
        expect(result).toHaveProperty('Success', Data.Progress.Success);
    });
});
