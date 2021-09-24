/* globals describe it expect */
const zapier = require('zapier-platform-core');

const App = require('../../../index');
const trigger = require('../progress-updated');

const appTester = zapier.createAppTester(App);

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
        MimeType: 'application/vnd.nextthought.zapier.completioncontextprogressdetails',
        AbsoluteProgress: 10,
        MaxPossibleProgress: 50,
        PercentageProgress: 0.2,
        Completed: false,
        Success: false,
    }
};

describe('progress-updated trigger', () => {
    it('extracts data from bundle', async () => {
        const [result] = await appTester(trigger.operation.perform, { cleanedRequest: { Data } });
        
        // User
        expect(result).toHaveProperty('Username', Data.User.Username);
        expect(result).toHaveProperty('Email', Data.User.Email);

        // Course
        expect(result).toHaveProperty('CourseTitle', Data.Course.Title);
        expect(result).toHaveProperty('ProviderId', Data.Course.ProviderId);

        // Progress
        expect(result).toHaveProperty('AbsoluteProgress', Data.Progress.AbsoluteProgress);
        expect(result).toHaveProperty('MaxPossibleProgress', Data.Progress.MaxPossibleProgress);
        expect(result).toHaveProperty('PercentageProgress', Data.Progress.PercentageProgress);
        expect(result).toHaveProperty('Completed', Data.Progress.Completed);
        expect(result).toHaveProperty('Success', Data.Progress.Success);
    });
});
