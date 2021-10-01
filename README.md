# nti.integrations.zapier

## Overview

Zapier allows users to connect apps where no direct integration is available. Providing a Zapier integration for the NextThought platform enables end users to trigger external actions in response to platform events, e.g. posting a message to a Slack channel when a user enrolls in a course or adding a row to a Google sheet when a new user is created.

The "app" from this repo ultimately gets pushed to Zapier. None of this code runs within the NextThought platform.

This document is not a replacement for the [Zapier documentation](https://github.com/zapier/zapier-platform/blob/master/packages/cli/README.md), but provides a general introduction to this initial implemenation.

## Introduction

Zapier integrations fundamentally consist of three things: [Triggers, Searches, and Creates](https://github.com/zapier/zapier-platform/blob/master/packages/cli/README.md#triggerssearchescreates). The Zapier docs state:

- Triggers read data from your API. These have their own section in the Zap Editor.
- Creates send data to your API to create new records. These are listed under "Actions" in the Zap Editor.
- Searches find specific records in your system. These are also listed under "Actions" in the Zap Editor.

## Triggers

Triggers are facilitated in the NextThought platform via webhooks. See the [nti.app.products.zapier docs](https://github.com/NextThought/nti.app.products.zapier/blob/master/docs/initial_api.rst) for details.

On the Zapier integration side, triggers are implemented via objects with a particular shape. Details of the trigger schema can be found in the zapier documentation, but here's an example for a "User Enrolled" trigger showing some key landmarks:

```js
{
    key: 'user_enrolled',
    noun: 'user',

    display: {
        label: 'User Enrolled',
        description: 'Triggers when a user enrolls in a course.'
    },

    operation: {
        type: 'hook',
    
        perform: (z, bundle) => [flatten(bundle.cleanedRequest.Data)],
        performList: async (z, bundle) => ([sample]),

        performSubscribe: {
            method: 'POST',
            url: `{{bundle.authData.site}}${getSubscriptionPath('user', 'enrolled')}`,
            headers,
            body: {
                target: '{{bundle.targetUrl}}'
            }
        },
        performUnsubscribe: {
            method: 'DELETE',
            url: '{{bundle.authData.site}}{{bundle.subscribeData.href}}',
            headers,
        },

        sample,

        outputFields: [
            { key: 'CourseTitle', label: 'Course Title' },
            { key: 'Description' },
            { key: 'RichDescription', label: 'Description (Rich Text)' },
            { key: 'CourseId', label: 'Course ID' },
            { key: 'ProviderId', label: 'Provider ID' },
            { key: 'CourseCreatedTime', label: 'Course Created Time' },
            { key: 'StartDate', label: 'Start Date' },
            { key: 'EndDate', label: 'End Date' },
            { key: 'Username' },
            { key: 'Email' },
            { key: 'Realname', label: 'Real Name' },
            { key: 'NonI18NFirstName', label: 'First Name' },
            { key: 'NonI18NLastName', label: 'Last Name' },
            { key: 'LastLogin', label: 'Last Login' },
            { key: 'LastSeen', label: 'Last Seen' },
            { key: 'UserCreatedTime', label: 'User Created Time' },
            { key: 'Scope' },
        ]
    }
};
```

- `key` and `noun` are static identifiers used in the Zapier UI.
- `display` provides labels for the trigger in the Zapier UI.
- `operation` is where the guts of the implementation live.
- `operation.perform` receives information about the incoming request via the `bundle` argument, and returns data to be made available to the Zapier end user in response.
- `operation.performList` gets invoked to provide "live" data without waiting for a hook. This data can be static, but live samples are preferable when it makes sense. This is used to fetch data when setting up Zaps. We can make calls to the platform API here via the `z` argument. Authentication and other useful information is available via the `bundle` argument.
- `operation.performSubscribe` is a function or request configuration to subscribe to the hook. (For us this is a POST to dataserver.)
- `operation.performUnsubscribe` is a function or request configuration to unsubscribe to the hook. (For us this is a DELETE to dataserver.)
- `operation.sample` provides static sample data as a fallback for `performList`
- `operation.outputFields` specifies the fields expected in the output of the Zap, with optional human-readable labels, types, etc.; This is how Zapier knows what data to make available for feeding into other apps (e.g. a google sheet, emailer, etc.).

## Creates and Searches

Creates and searches follow a similar pattern, with minor variations to facilitate creating objects (e.g. a new user account) and searching for data (e.g. finding a course).

## Resources

In cases where a REST API makes sense for a given object type (list, create, search) a `resource` may be defined combining the triggers, search, and create into a single module.

## App

At the root of the app (index.js) we export an object with all of the resources, triggers, searches, and creates to inform Zapier of the available operations. This root export includes other information, including parameters needed to set up authentication, the app version, etc.

## Zapier CLI

Zapier includes a command-line utilty to perform a variety of tasks on an integration project. The most immediately useful commands (for me) have been:

- `zapier push` - to deploy your local code to zapier
- `zapier logs` - can display console logs, http logs, and information about the `bundle` object during zap runs.
- `zapier validate` - checks the project against zapier's publish standards. checks for errors, code style, etc.
- `zapier test` - runs jest tests and performs validation

---

This Zapier integration project is generated by the `zapier init` CLI command.

These are what you normally do next:

```bash
# Install dependencies
npm install  # or you can use yarn

# Run tests
zapier test

# Register the integration on Zapier if you haven't
zapier register "App Title"

# Or you can link to an existing integration on Zapier
zapier link

# Push it to Zapier
zapier push
```

Find out more on [the latest docs](https://github.com/zapier/zapier-platform/blob/master/packages/cli/README.md).
