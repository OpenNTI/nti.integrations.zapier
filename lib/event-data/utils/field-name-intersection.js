/**
 * Returns an array containing the property names present in both of the provided objects
 * 
 * @param {Object} a - Object to compare
 * @param {Object} b - Object to compare
 * @returns 
 */
function fieldNameIntersection(a, b) {
    if (!a || !b) {
        return [];
    }

    return Object.keys(a).filter(f => Object.prototype.hasOwnProperty.call(b, f));
}

module.exports = fieldNameIntersection;
