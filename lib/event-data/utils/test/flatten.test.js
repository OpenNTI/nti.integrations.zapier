/* globals describe it expect */

const flatten = require('../flatten');

const sample = {
    User: {
        MimeType: 'application/vnd.nextthought.zapier.userdetails',
        Username: 'jane.doe',
        Email: 'student@domain.com',
        Realname: 'Jane Doe',
        NonI18NFirstName: 'Jane',
        NonI18NLastName: 'Doe',
        LastLogin: '2021-08-25T19:32:59Z',
        LastSeen: '2021-08-25T21:32:59Z',
    },
    Course: {
        MimeType: 'application/vnd.nextthought.zapier.coursedetails',
        Id: 'tag:nextthought.com,2011-10:NTI-CourseInfo-0000000000000000000_0000000000000000000',
        Title: 'Zapier Test Course 001',
        ProviderId: 'ZT-001',
        Description: '',
        RichDescription: 'Testing zapier trigger',
        StartDate: '2021-08-25T19:32:59Z',
        EndDate: '2021-08-25T19:32:59Z',
        CreatedTime: '2021-08-25T19:32:59Z',
        'Last Modified': '2021-08-25T19:32:59Z',
    },
    Unhandled: {
        Foo: 'bar',
    },
    Scope: 'ForCredit' // One of Public, Purchased, ForCredit, ForCreditDegree, or ForCreditNonDegree
};

describe('flatten utility', () => {
    it('flattens user and course details', () => {
        const result = flatten(sample);

        // should have renamed fields at root
        expect(result).toHaveProperty('CourseId', sample.Course.Id);
        expect(result).toHaveProperty('CourseTitle', sample.Course.Title);

        // should have original fields at root
        expect(result).toHaveProperty('ProviderId', sample.Course.ProviderId);
        expect(result).toHaveProperty('Username', sample.User.Username);
        expect(result).toHaveProperty('Realname', sample.User.Realname);

        // objects with no handler should be omitted
        expect(result).not.toHaveProperty('Unhandled');
        expect(result).not.toHaveProperty('Foo');

        // renamed fields should not be present
        expect(result).not.toHaveProperty('Id');
        expect(result).not.toHaveProperty('Title');
    });

    it('merges unhandled objects', () => {
        const result = flatten(sample, true);

        // should have renamed fields at root
        expect(result).toHaveProperty('CourseId', sample.Course.Id);
        expect(result).toHaveProperty('CourseTitle', sample.Course.Title);

        // should have original fields at root
        expect(result).toHaveProperty('ProviderId', sample.Course.ProviderId);
        expect(result).toHaveProperty('Username', sample.User.Username);
        expect(result).toHaveProperty('Realname', sample.User.Realname);

        // objects with no handler should be merged
        expect(result).toHaveProperty('Foo', sample.Unhandled.Foo);

        // renamed fields should not be present
        expect(result).not.toHaveProperty('Id');
        expect(result).not.toHaveProperty('Title');
    });

    it('throws on field collisions', () => {
        const o = {
            foo: { bar: 1 },
            baz: { bar: 1 },
        };
        expect(() => flatten(o, true).toThrow());
    });
});
