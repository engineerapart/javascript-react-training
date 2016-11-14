function ExtendableError(message) {
  var error = Error.call(this, message);

  this.name = this.constructor.name;
  this.message = error.message;
  this.stack = error.stack;
}

ExtendableError.prototype = Object.create(Error.prototype);
ExtendableError.prototype.constructor = ExtendableError;

export {ExtendableError};

export default class ApiError extends ExtendableError {
  constructor(message, response, content) {
    super(message);

    this.url = response && response.url;
    this.status = response && response.status;
    this.statusText = response && response.statusText;
    this.response = response;
    this.content = content || message;
  }
}
