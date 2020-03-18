const { ValidationError } = require('./error')

let validate = (validator, ...args) => (req, res, next) => {
  let validatorFnc;

  if (args.length > 0) {
    validatorFnc = validator(...args.map(arg => arg(req)))
  } else {
    validatorFnc = validator
  }

  if (!validatorFnc(req.body)) {
    return next(new ValidationError(validatorFnc.errors))
  }
  next()
};

module.exports = validate;
