/* globals describe it expect */
const CourseDetails = require('../CourseDetails');
const UserDetails = require('../UserDetails');
const UserEnrolledEvent = require('../UserEnrolledEvent');

const dataserverSample = {
    Course: {
        Id: 'tag:nextthought.com,2011-10:NTI-CourseInfo-0000000000000000000_0000000000000000000',
        Title: 'Zapier Test Course 001',
        ProviderId: 'ZT-001',
        Description: '',
        RichDescription: 'Testing zapier trigger',
        StartDate: '2021-08-25T19:32:59Z',
        EndDate: '2021-08-25T19:32:59Z',
        CreatedTime: '2021-08-25T19:32:59Z',
        'Last Modified': '2021-08-25T19:32:59Z',
        MimeType: CourseDetails.MimeType,
    },
    User: {
        Username: 'jane.doe',
        Email: 'student@domain.com',
        Realname: 'Jane Doe',
        NonI18NFirstName: 'Jane',
        NonI18NLastName: 'Doe',
        LastLogin: '2021-08-25T19:32:59Z',
        LastSeen: '2021-08-25T21:32:59Z',
        CreatedTime: '2021-08-25T21:32:59Z',
        MimeType: UserDetails.MimeType,
    },
    Scope: 'ForCredit',
    MimeType: UserEnrolledEvent.MimeType
};

describe('UserEnrolledEvent data', () => {
    it('Should flatten and remap dataserver fields', () => {
        const output = UserEnrolledEvent.transform(dataserverSample);
        expect(output).toHaveProperty('CourseId', dataserverSample.Course.Id);
        expect(output).toHaveProperty('CourseTitle', dataserverSample.Course.Title);
        expect(output).toHaveProperty('Username', dataserverSample.User.Username);
        expect(output).toHaveProperty('LastLogin', dataserverSample.User.LastLogin);
        
        expect(output).not.toHaveProperty('Course');
        expect(output).not.toHaveProperty('User');
        expect(output).not.toHaveProperty('MimeType');
    });
});

