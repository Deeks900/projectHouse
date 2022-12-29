const { db, rtdb, admin } = require("../auth");
const {sendMail} = require("../sendMail");

const url = 'http://localhost:3000/signin';
const actionCodeSettings ={
  url:url
}

exports.sendVerificationEmailHandler = async(user)=>{
    try {
        const { uid, email, emailVerified } = user;
    
        if (!email) {
          return console.log(`Email is undefined for user: ${uid}`);
        }
    
        if (!emailVerified) {
          const verificationLink = await admin
            .auth()
            .generateEmailVerificationLink(email,actionCodeSettings);
          await db.collection("cl_mail").add({
            to: email,
            template: {
              name: "verificationEmailTemplate",
              data: {
                verificationLink
              }
            }
          });
          
          //Now send this verification link to the user using nodemailer
          sendMail(email, verificationLink)
          return console.log(`Verification email sent to ${email}`);
        } else {
          return console.log(`${email} is already verified`);
        }
      } catch (e) {
        return console.log(e.message);
      }
}

const createNotification = async(notification)=>{
  try{
    let result = await admin.firestore().collection('notifications')
    .add(notification)

   return console.log("Notification Added", result);
  }
  catch (e) {
    return console.log(e.message);
  } 
}

exports.notificationsHandler = async(doc)=>{
  try{
    const project = doc.data();
    const notification = {
      content: "Added a new project",
      user: project.author,
      time: admin.firestore.FieldValue.serverTimestamp()
    }
  
    await createNotification(notification);
    return console.log("Notification Function ran successfully!")
  }
  catch (e) {
    return console.log(e.message);
  } 
}

exports.userHandler = async (user)=>{
  try{
    let result = await admin.firestore().collection('users')
      .doc(user.uid).get();

      const newUser = result.data();
      const notification = {
        content:"Joined projectStore!",
        user: newUser.displayName,
        time: admin.firestore.FieldValue.serverTimestamp()
      }
      await createNotification(notification);
      return console.log("UserHandler Function ran successfully!")
  }
  catch (e) {
    return console.log(e.message);
  }
}