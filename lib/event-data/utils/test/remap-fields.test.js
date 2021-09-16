/* globals describe it expect */

const remapFields = require('../remap-fields');

describe('remap-fields', () => {
    it('Should remap fields', () => {
        const input = { Id: 'foo', Title: 'bar'};
        const fieldMap = {Id: 'RemappedId', Title: 'RemappedTitle'};
        const result = remapFields(input, fieldMap);

        Object.entries(fieldMap).forEach(([infield, outfield]) => {
            // should have the new field
            expect(result).toHaveProperty(outfield, input[infield]);

            // should not have the original field
            expect(result).not.toHaveProperty(infield);
        });
    });
});
