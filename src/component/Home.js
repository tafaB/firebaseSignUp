import { signOut } from "firebase/auth";
import { useAuthValue } from "../context/AuthContext";
import { auth } from "../config/firebase";

function Home() {
  const { currentUser } = useAuthValue();
  console.log(currentUser?.email);
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome {currentUser?.email}</p>
      <input type="text" placeholder="Enter your name" />
      <button onClick={() => {
        signOut(auth);
        console.log("user signed out : " + currentUser?.email);
      }
      }>Sign Out</button>
    </div>
  );
}

export default Home;
