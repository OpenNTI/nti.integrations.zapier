const known = new Set();

function validate (handler) {
    if (typeof handler?.handles !== 'function') {
        throw new TypeError('Handler must expose a "handles" function');
    }
}

/**
 * A simple datatype registry to facilitate consistent handling of datastructures/models
 * coming from dataserver. We deal with the same data shapes (e.g. CourseDetails) in multiple
 * places (different triggers, etc.) and need the same field remappings, the same sample data,
 * and so on.
 * 
 * This regsitry provides a mechanism by which a "handler" can be looked up for a given object
 * (usually by MimeType) to provide these common functions.
 */
class Registry {
    add (handler) {
        validate(handler);
        known.add(handler);
    }

    getHandler (obj) {
        return [...known].find(x => x?.handles?.(obj));
    }

    // for debugging/testing
    list () {
        return [...known];
    }
}

const instance = new Registry();

instance.add(require('./CourseDetails'));
instance.add(require('./UserDetails'));
instance.add(require('./ProgressDetails'));

module.exports = instance;
