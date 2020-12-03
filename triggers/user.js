const performSubscribe = async (z, bundle)  => {
    z.console.log('PERFORM SUBSCRIBE:');
    z.console.log(JSON.stringify(bundle, null, 3));
    return Promise.resolve({
        bundle,
        subscribed: true
    });
}

const performUnsubscribe = async (z, bundle)  => {
    z.console.log('PERFORM UNSUBSCRIBE:');
    z.console.log(JSON.stringify(bundle, null, 3));
    return Promise.resolve({
        bundle,
        unsubscribed: true
    });
}

const perform = (z, bundle) => {
    z.console.log('PERFORM:');
    z.console.log(JSON.stringify(bundle, null, 3));
    return [{
        ...bundle.cleanedRequest
    }];
}

const performList = (z, bundle) => {
    return [{
        ID: "123",
        NonI18NFirstName: "John",
        NonI18NLastName: "Smith",
        Username: "johnsmith",
        realname: "John Smith",
    }]
}

module.exports = {
    key: 'user',
    noun: 'User',

    display: {
        label: 'New User',
        description: 'Triggers when a new user account is created.'
    },

    operation: {
        type: 'hook',
    
        perform,
        performList,
        performSubscribe,
        performUnsubscribe,

        sample: {
            ID: "123",
            NonI18NFirstName: "John",
            NonI18NLastName: "Smith",
            Username: "johnsmith",
            realname: "John Smith",
        },

        outputFields: [
            { key: 'ID', label: 'ID', type: "integer" },
            { key: 'Username', label: 'Username' },
            { key: 'realname', label: 'Real Name' },
            { key: 'NonI18NFirstName', label: 'First Name' },
            { key: 'NonI18NLastName', label: 'Last Name' },
        ]
    }
}
