import { sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthValue } from "../context/AuthContext";
import { errorAuthSms } from "./ErrorHandling";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword1] = useState("");
  const [error, setError] = useState(null);
  const { setTimerActive } = useAuthValue();
  const navigate = useNavigate();
  const enterUser = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in: ", userCredential.user.email);
      if (userCredential.user.emailVerified) {
        navigate("/");
      }
      else {
        try {
          const emailVerified = await sendEmailVerification(auth.currentUser);
          console.log("Email verification sent: ", emailVerified);
          setTimerActive(true);
          navigate("/verify-email");
        }
        catch (error) {
          setError(errorAuthSms(error));
        }
      }
    }
    catch (error) {
      setError(errorAuthSms(error));
    }
  };
  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={enterUser}>
        <input
          required
          type="emial"
          placeholder="Username"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword1(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      {error &&
        <p style={{ width: '200px', backgroundColor: 'red', color: 'white' }}>
          {error}
        </p>
      }
      <p>Do not have an account?
        <Link to="/sign-up">Sign Up</Link>
      </p>
    </div>
  );
}

export default SignIn;
