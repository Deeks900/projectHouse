export const modifyAuthErrorMsg = (payload) => {
    switch (payload.code) {
    //   case "auth/wrong-password":
    //   case "auth/user-not-found":
    //     return "The email and/or the password seems to be incorrect.";
  
      case "auth/email-already-in-use":
        return "An account with the same email already exists.";

      case "email-unverified":
        return "Please verify your email."

      case "auth/wrong-password":
        return "Incorrect Password!"

      case "auth/user-not-found":
        return "No account is found with this mail!"
  
    //   case "auth/too-many-requests":
    //     return "Logging in has been disabled temperorily due to too many unsuccessful attempts. Please check back in a few minutes.";
  
      default:
        return payload.message || payload;
    }
  };