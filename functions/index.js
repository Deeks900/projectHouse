const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const onCreateFunctions = require("./cloud_functions/onCreateFunctions");
exports.sendVerificationEmail = functions.auth
  .user()
  .onCreate(onCreateFunctions.sendVerificationEmailHandler);

exports.projectCreated = functions.firestore.document('projects/{projectId}')
  .onCreate(onCreateFunctions.notificationsHandler)

 exports.userJoined = functions.auth
   .user()
  .onCreate(onCreateFunctions.userHandler); 