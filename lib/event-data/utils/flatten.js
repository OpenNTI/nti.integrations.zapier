const registry = require('../Registry');

/**
 * Utility for flattening a nested object because Zapier strongly prefers flat data.
 * The event-data objects (e.g. ../CourseDetails.js) specify fields of interest and
 * name-remappings to avoid collisions. This function looks for the appropriate
 * transforms among registered handlers and runs them. Could be made recursive if
 * the need arises.
 * 
 * @param {Object} obj - the input object
 */
function flatten (obj, result = {}) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (typeof value !== 'object') {
            return { ...acc, [key]: value };
        }

        const handler = registry.getHandler(value);
        const transformed = handler?.transform?.(value);

        return { ...acc, ...transformed };
    }, result);
}

module.exports = flatten;
