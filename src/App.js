//https://css-tricks.com/user-registration-authentication-firebase-react/
import { useEffect, useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import SignUp from "./component/SignUp";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import PrivateRoute from "./component/PrivateRoute";
import EmailVerification from "./component/EmailVerification";
import SignIn from "./component/SignIn";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider value={{currentUser, timerActive, setTimerActive}}>
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <Home/>
            </PrivateRoute>
          }/>
          <Route path="/sign-up" element={
            !currentUser?.emailVerified 
            ? <SignUp/>
            : <Navigate to='/' replace/>
          } />
          <Route path="/sign-in" element={
            !currentUser?.emailVerified
            ? <SignIn/>
            : <Navigate to='/' replace/>
          } />
          <Route path="/verify-email" element={
            <EmailVerification/>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
