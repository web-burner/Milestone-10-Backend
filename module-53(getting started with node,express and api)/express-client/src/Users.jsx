import { useState } from "react";
import { use } from "react";

const Users = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);
  const [users , setUsers ] = useState(initialUsers)
  console.log(users);
  const handleUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const newUser = { name, email };
    fetch("http://localhost:3500/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => setUsers([...users,data]));
  };
  return (
    <div>
      <form onSubmit={handleUser}>
        <input type="text" name="name" placeholder="Name" /> <br />
        <input type="email" name="email" placeholder="Email" /> <br />
        <input type="submit" value="Submit" />
      </form>
      <h2>All Users</h2>
      <div>
        {users.map((user) => (
          <p key={user.id}>
            {user.name}, Email: {user.email}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
