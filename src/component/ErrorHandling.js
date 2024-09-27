export function errorAuthSms(error) {
  let errorText = "";
  if (error.code === "auth/email-already-in-use") {
    errorText = "Email already in use.";
  }
  else if (error.code === "auth/missing-email") {
    errorText = "Missing email.";
  }
  else if (error.code === "auth/weak-password") {
    errorText = "Weak password.";
  }
  else if (error.code === "auth/invalid-email") {
    errorText = "Invalid email.";
  }
  else if (error.code === "auth/missing-password") {
    errorText = "Missing password.";
  }
  else if (error.code === "auth/too-many-requests") {
    errorText = "Too many requests. Try again in a bit.";
  }
  else if(error.code === "auth/invalid-credential") {
    errorText = "Invalid credentials.";
  }
  else {
    errorText = error.message;
  }
  return errorText;
}
