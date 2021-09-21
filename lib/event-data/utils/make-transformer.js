/**
 * Creates an object transform function to extract (and optionally rename) properties from an input object.
 * Used to turn dataserver objects into their Zapier counterparts.
 * 
 * @param {Object[]} outputFields - The fields expected in the return object. See https://github.com/zapier/zapier-platform/blob/master/packages/cli/README.md#output-fields
 * @param {string} outputFields[].key - The field name
 * @param {Object} [nameMappings] - A mapping of fields to rename in the output object; { outputName: originalName }
 * @returns {(obj: Object) => Object}
 */
const makeTransformer = (outputFields, nameMappings = {}) => (obj) => {
    return outputFields.reduce((acc, {key}) => {

        // original field name if it's been remapped
        const field = nameMappings[key] || key;

        acc[key] = obj[field];

        return acc;
    }, {});
};

module.exports = makeTransformer;
