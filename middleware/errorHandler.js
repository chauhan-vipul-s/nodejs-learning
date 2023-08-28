// need to apply this into the server.js file

const { constants } = require("../constants");

const { VALIDATION_ERROR, UNAUTHORIZED, SERVER_ERROR, FORBIDDEN, NOT_FOUND } =
constants;

const errorHandler = (err, req, res, next) => {
  // it came form controller in which error was generated
  const statusCode = res.statusCode || 500;
  // for all error handling create contants.js file at top most directory
  switch (statusCode) {
    case VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case NOT_FOUND:
      res.json({
        title: "Not Found!",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case UNAUTHORIZED:
      res.json({
        title: "Unauthorized!",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case FORBIDDEN:
      res.json({
        title: "Forbidden!",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case SERVER_ERROR:
      res.json({
        title: "Internal Server Error!",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No Error all good!!");
      res.json({
        title: "Internal Server Error!",
        message: err.message,
        stackTrace: err.stack,
      });
  }
};

module.exports = { errorHandler };
