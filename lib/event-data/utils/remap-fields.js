const remapFields = (obj, fieldNames = {}) => {
    for (let field in fieldNames) {
        if (Object.prototype.hasOwnProperty.call(obj, field)) {
            const newName = fieldNames[field];
            obj[newName] = obj[field];
            delete obj[field];
        }
    }
};

module.exports = remapFields;
