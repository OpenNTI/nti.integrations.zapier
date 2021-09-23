/* globals describe it expect */

const fieldNameIntersection = require('../field-name-intersection');

describe('field name intersection', () => {
    it('returns common property names', () => {
        expect(fieldNameIntersection({ foo: 1, bar: 2}, {foo: 3, bar: 4})).toHaveLength(2);
        expect(fieldNameIntersection({ foo: 1, bar: 2}, {foo: 3})).toHaveLength(1);
    });

    it('handles bad arguments', () => {
        // undefined?
        expect(() => fieldNameIntersection()).not.toThrow();
        expect(() => fieldNameIntersection()).toHaveLength(0);

        // no second arg?
        expect(() => fieldNameIntersection({})).not.toThrow();
        expect(() => fieldNameIntersection({})).toHaveLength(0);

        // no first arg?
        expect(() => fieldNameIntersection(undefined, {})).not.toThrow();
        expect(() => fieldNameIntersection(undefined, {})).toHaveLength(0);

        // null?
        expect(() => fieldNameIntersection(null, {})).not.toThrow();
        expect(() => fieldNameIntersection(null, {})).toHaveLength(0);

        // numbers?
        expect(() => fieldNameIntersection(4)).not.toThrow();
        expect(() => fieldNameIntersection(4)).toHaveLength(0);

        // strings?
        expect(() => fieldNameIntersection(4, 'foo')).not.toThrow();
        expect(() => fieldNameIntersection(4, 'foo')).toHaveLength(0);
        expect(() => fieldNameIntersection('foo', 'foo')).toHaveLength(0);
    });
});
