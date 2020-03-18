class BasicError extends Error {
  constructor (msg = 'Invalid Request', status = 400) {
    super(msg);
    this.status = status
  }
  toJSON () {
    return {
      status: this.status,
      message: this.message
    }
  }
}

class RequestError extends BasicError {
  constructor (msg, code = 'requestError') {
    super(msg, 400);
    this.name = 'RequestError';
    this.code = code
  }
  toJSON () {
    return {
      status: this.status,
      message: this.message,
      code: this.code
    }
  }
}
class ValidationError extends BasicError {
  constructor (errors, msg = 'Invalid data') {
    super(msg, 400);
    this.errors = errors;
    this.name = 'ValidationError'
  }
}

class NotAuthorizedError extends BasicError {
  constructor (msg = 'Not authorized') {
    super(msg, 401)
  }
}

class NotFoundError extends BasicError {
  constructor (msg = 'Not found') {
    super(msg, 404)
  }
}

class FormatError extends BasicError {
  constructor (msg = 'Unsupported file type') {
    super(msg, 415)
  }
}

class WorkerNotFoundError extends Error {
  constructor (msg = 'Invalid Request') {
    super(msg);
    this.status = 404;
    Error.captureStackTrace(this, this.constructor)
  }
  toJSON () {
    return {
      status: this.status,
      message: this.message
    }
  }
}

class ForbiddenError extends BasicError {
  constructor (msg = 'Forbidden') {
    super(msg, 403)
  }
}

module.exports = {
  BasicError,
  RequestError,
  ValidationError,
  NotAuthorizedError,
  NotFoundError,
  FormatError,
  WorkerNotFoundError,
  ForbiddenError
};
