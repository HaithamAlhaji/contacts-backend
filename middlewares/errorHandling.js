const { constants } = require("../constants");

const errorHandling = (err, req, res, next) => {
  const errorStatus = res.statusCode ? res.statusCode : 500;
  switch (errorStatus) {
    case constants.BAD_REQUEST:
      res.json({
        error: errorStatus,
        message: err.message,
        stackTrace: err.stack,
      });

      break;
    case constants.NOT_FOUND:
      res.json({
        error: errorStatus,
        message: err.message,
        stackTrace: err.stack,
      });
    case constants.UNAUTHORIZED:
      res.json({
        error: errorStatus,
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_AUTHORZED:
      res.json({
        error: errorStatus,
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No error");
      break;
  }
};

module.exports = errorHandling;
