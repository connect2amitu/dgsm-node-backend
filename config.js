module.exports = Object.freeze({
  // DATABASE: "mongodb://dgsm:dgsmsep16@ds115434.mlab.com:15434/dgsm"
  DATABASE: "mongodb://admin:admin123@ds047124.mlab.com:47124/dgsm",
   
  // HTTP Status
  OK_STATUS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  MEDIA_ERROR_STATUS: 415,
  VALIDATION_FAILURE_STATUS: 417,
  DATABASE_ERROR_STATUS: 422,
  INTERNAL_SERVER_ERROR: 500,


   // jwt
   SECRET_KEY: "shukrana_mushkurana",
   EXPIRED_TIME: "100d"
});
