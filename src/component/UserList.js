import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase"
import { useEffect, useState } from "react";
function UserList() {
  const collectionRef = collection(db, "users");
  const [data, setData] = useState([]);
  const getUsers = async () => {
    try {
      const doc = await getDocs(collectionRef);
      const users = [];
      doc.forEach((user) => {
        users.push({ id: user.id, name: user.data().bering });
      });
      setData(users);
    }
    catch (e) {
      console.error("Error getting users: ", e);
    }
  }
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <h1>Users</h1>
      {data.map((user) => (
        <div key={user.id}>
          <p> - {user.name}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;
