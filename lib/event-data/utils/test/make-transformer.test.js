/* globals describe it expect */

const makeTransformer = require('../make-transformer');

describe('make transformer', () => {
    it('Should remap fields', () => {
        const input = { Id: 'foo', Title: 'bar'};
        const fieldMap = {RemappedId: 'Id', RemappedTitle: 'Title'};
        const outputFields = [
            { key: 'RemappedId' },
            { key: 'RemappedTitle' },
        ];
        const result = makeTransformer(outputFields, fieldMap)(input);

        Object.entries(fieldMap).forEach(([outfield, infield]) => {
            // should have the new field
            expect(result).toHaveProperty(outfield, input[infield]);

            // should not have the original field
            expect(result).not.toHaveProperty(infield);
        });
    });
});
