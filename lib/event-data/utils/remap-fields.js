const remapFields = (obj, fieldNames = {}) => {
    const result = {...obj};

    for (let field in fieldNames) {
        if (Object.prototype.hasOwnProperty.call(obj, field)) {
            const newName = fieldNames[field];
            result[newName] = result[field];
            delete result[field];
        }
    }
    return result;
};

module.exports = remapFields;
