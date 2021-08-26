const created = require('./created');
const progressUpdated = require('./progress-updated');

module.exports = {
    [created.key]: created,
    [progressUpdated.key]: progressUpdated
};
