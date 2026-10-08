export default class ApiError extends Error {
  constructor(statusCode, message, code = "ERROR") {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
  }
}