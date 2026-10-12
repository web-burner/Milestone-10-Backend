import { useState } from "react";
import { use } from "react";

const Users = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);
  const [users, setUsers] = useState(initialUsers);
  const handleUser = (e) => {
    console.log(users);
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const id = users.length + 1;
    const newUsers = { id, name, email };
    
    fetch("http://localhost:3500/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUsers),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after post ", data);
        setUsers([...users, data]);
        e.target.reset();
      });
  };
  return (
    <div>
      <form onSubmit={handleUser}>
        <input type="text" name="name" placeholder="Name" /> <br />
        <input type="email" name="email" placeholder="Email" /> <br />
        <input type="submit" value="Submit" />
      </form>
      <div>
        {users.map((user) => (
          <p key={user.id}>
            Name: {user.name}, Email: {user.email}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
