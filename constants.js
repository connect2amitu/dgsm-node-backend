module.exports = Object.freeze({
  // DATABASE: "mongodb://dgsm:dgsmsep16@ds115434.mlab.com:15434/dgsm"
  OBJECT_ID: require("mongoose").Types.ObjectId,

  AUDIO_TYPES: ["bhajan", "vani"],


  MIME_TYPES: {
    image: ["image/png", "image/jpeg", "image/jpg", "image/bmp", "image/gif"],
    audio: ["audio/mp3", "audio/mid", "audio/mpeg", "audio/x-aiff", "audio/x-mpegurl", "audio/x-pn-realaudio", "audio/x-pn-realaudio", "audio/x-wav"],
  },


  // HTTP Status
  OK_STATUS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  MEDIA_ERROR_STATUS: 415,
  VALIDATION_FAILURE_STATUS: 417,
  DATABASE_ERROR_STATUS: 422,
  INTERNAL_SERVER_ERROR: 500,


  LANGUAGES: [
    "hindi",
    "sindhi",
    "punjabi",
    "english",
  ]

});
