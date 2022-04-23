const {createAddColumnMigration} = require('../../utils');

module.exports = createAddColumnMigration('email_recipients', 'member_status', {
    type: 'string',
    maxlength: 10,
    nullable: true
});
