const registry = require('../Registry');

/**
 * Utility for flattening a nested object because Zapier strongly prefers flat data.
 * The event-data objects (e.g. ../CourseDetails.js) specify fields of interest and
 * name-remappings to avoid collisions. This function looks for the appropriate
 * transforms among registered handlers and runs them. Could be made recursive if
 * the need arises.
 * 
 * @param {Object} obj - the input object
 * @param {boolean=false} mergeUnhandled - Whether properties without an explicit handler should be merged into the returned object (true) or omitted (false).
 * @returns {Object} - the flattened/transformed object
 */
function flatten (obj, mergeUnhandled) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (typeof value !== 'object') {
            return { ...acc, [key]: value };
        }

        const handler = registry.getHandler(value);

        // mergeUnhandled pulls fields up to the top (flattens) if no handler/transform is available;
        const transformed = handler?.transform?.(value) ?? (mergeUnhandled ? value : {});

        return { ...acc, ...transformed };
    }, {});
}

module.exports = flatten;
