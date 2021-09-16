/* globals describe it expect */
const CourseDetails = require('../CourseDetails');

const dataserverSample = {
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
};

describe('CourseDetails event data', () => {
    it('Should remap dataserver fields', () => {
        const output = CourseDetails.transform(dataserverSample);
        expect(output).toHaveProperty('CourseId', dataserverSample.Id);
        expect(output).toHaveProperty('CourseTitle', dataserverSample.Title);
    });
});

