const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid'
    },
    email: {
      type: 'varchar',
      length: 254,
      unique: true,
      nullable: false
    },
    name: {
      type: 'varchar',
      length: 100,
      nullable: false
    },
    password: {
      type: 'varchar',
      length: 100,
      nullable: false
    },
    role: {
      type: 'varchar',
      length: 20,
      nullable: false,
      default: 'USER'
    },
    created_at: {
      type: 'timestamp',
      createDate: true
    },
    updated_at: {
      type: 'timestamp',
      updateDate: true
    }
  }
});
