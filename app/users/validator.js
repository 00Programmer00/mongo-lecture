const ajv = require('ajv')();

let registerUserSchema = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string'
        },
        lastName: {
          type: 'string'
        },
        age: {
          type: 'number'
        },
        email: {
          type: 'string'
        }
      },
      required: ['firstName', 'lastName', 'age', 'email'],
      additionalProperties: false
    }
  },
  required: ['user'],
  additionalProperties: false
};

module.exports.register = ajv.compile(registerUserSchema);
