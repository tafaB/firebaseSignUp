import { reload, sendEmailVerification } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAuthValue } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EmailVerification() {
  const { timerActive, currentUser, setTimerActive } = useAuthValue();
  const [timeLeft, setTimeLeft] = useState(60);
  const navigate = useNavigate();
  useEffect(() => {
    let interval = setInterval( async ()=>{
      try {
        await currentUser?.reload();
        if (currentUser?.emailVerified) {
          clearInterval(interval);
          navigate("/");
        }
      }
      catch (error) {
        console.error("Error with email verification: " + error.message);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [currentUser, navigate]);
  /*
      Best Practice:

      Including all values that are used inside the effect in the dependency
      array is considered a best practice. This ensures that the effect is always
      working with the latest values. While navigate is stable in most cases,
      the practice of listing all used dependencies ensures completeness and
      helps prevent bugs.
   */

  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }
    else {
      clearInterval(interval);
      setTimerActive(false);
      // setTimeLeft(60); => no need since already done when resendEmail is clicked
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, setTimerActive]);

  const resendEmail = async () => {
    try {
      const emailVerified = await sendEmailVerification(auth.currentUser);
      console.log("Email verification sent: ", emailVerified);
      setTimerActive(true);
      setTimeLeft(60);
    }
    catch (error) {
      console.error("Error with email verification: " + error.message);
    }
  };
  return (
    <div>
      <h1>Email Verification</h1>
      <p>
        An email has been sent to your email address. Please verify your email
        address to continue.
      </p>
      <button onClick={resendEmail} disabled={timerActive}>
        Resend Email {timerActive && `in ${timeLeft}s`}
      </button>
    </div>
  );
}

export default EmailVerification;
