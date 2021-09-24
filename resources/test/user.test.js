/* globals describe it expect */
const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

const sampleUserCreatedPayload = {
    MimeType: 'application/vnd.nextthought.zapier.userdetails',
    Username: 'jane.doe',
    Email: 'student@domain.com',
    Realname: 'Jane Doe',
    NonI18NFirstName: 'Jane',
    NonI18NLastName: 'Doe',
    LastLogin: '2021-08-25T19:32:59Z',
    LastSeen: '2021-08-25T21:32:59Z',
    CreatedTime: '2021-08-25T21:32:59Z',
};

describe('user resource', () => {
    it('hook should return a UserDetails record', async () => {
        const bundle = { cleanedRequest: { Data: sampleUserCreatedPayload } };

        const results = await appTester(App.resources.user.hook.operation.perform, bundle);

        expect(results).toHaveLength(1);
        expect(results[0]).toHaveProperty('Username', sampleUserCreatedPayload.Username);
        expect(results[0]).toHaveProperty('UserCreatedTime', sampleUserCreatedPayload.CreatedTime);
        expect(results[0]).not.toHaveProperty('MimeType');
    });
});
