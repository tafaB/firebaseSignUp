import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext";
import { errorAuthSms } from "./ErrorHandling";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  //object destructuring in JavaScript => same as:
  //const x=useAuthValue(); const timerActive=x.timerActive;
  const { setTimerActive } = useAuthValue();
  const navigate = useNavigate();

  const createNewUser = async (e) => {
    e.preventDefault();
    try {
      if (password1 !== '' && password2 !== '' && password1 !== password2) {
        throw new Error("Passwords do not match");
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password1);
      console.log("User created: ", userCredential.user.email)
      try {
        const emailVerified = await sendEmailVerification(auth.currentUser);
        console.log("Email verification sent: ", emailVerified);
        setTimerActive(true);
        navigate('/verify-email');
      }
      catch (error) {
        setError(errorAuthSms(error));
      }
    } catch (error) {
      setError(errorAuthSms(error));
    }
    // setEmail('');
    // setPassword1('');
    // setPassword2('');
  };

  console.log(auth?.currentUser?.email);

  useEffect(() => {
    if (password1 === password2) {
      console.log("Passwords match");
    } else {
      console.log("Passwords do not match");
    }
  }, [password1, password2]);

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={createNewUser}>
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
        <input
          required
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      {error &&
        <p style={{ width: '200px', backgroundColor: 'red', color: 'white' }}>
          {error}
        </p>
      }
      <p>Already have an account?
        <Link to="/sign-in">Sign In</Link>
      </p>
    </div>
  );
}

export default SignUp;
