/* globals describe it expect */
const UserDetails = require('../UserDetails');

const dataserverSample = {
    Username: 'jane.doe',
    Email: 'student@domain.com',
    Realname: 'Jane Doe',
    NonI18NFirstName: 'Jane',
    NonI18NLastName: 'Doe',
    LastLogin: '2021-08-25T19:32:59Z',
    LastSeen: '2021-08-25T21:32:59Z',
};

describe('UserDetails event data', () => {
    it('Should have dataserver fields', () => {
        const output = UserDetails.transform(dataserverSample);
        Object.entries(dataserverSample).forEach(([key, value]) => {
            expect(output).toHaveProperty(key, value);
        });
    });
});
