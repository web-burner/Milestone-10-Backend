import { use, useState } from "react";
import { Link } from "react-router";

const Users = ({ userPromise }) => {
  const initialUsers = use(userPromise);
  const [users, setUsers] = useState(initialUsers);

  // store data in database and show in ui
  const handleUsers = (e) => {
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
      .then((data) => {
        if (data.insertedId) {
          newUser._id = data.insertedId;
          setUsers([...users, newUser]);
          alert('User added in database Successfully!')
          e.target.reset()
        }
      });
  };

  // delete uses from database and ui
  const handleDeleteUser = (id) => {
    console.log(id);
    fetch(`http://localhost:3500/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          const updatedUser = users.filter((user) => user._id !== id);
          setUsers(updatedUser);
          console.log("After delete", data);
          alert("User Deleted Successfully!");
        }
      });
  };
  return (
    <div>
      <form onSubmit={handleUsers}>
        <input type="text" name="name" placeholder="Name" />
        <br />
        <input type="email" name="email" placeholder="Email" />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <h1>Users are here</h1>
      <div>
        {users.map((user) => (
          <div
            key={user._id}
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <p>{user.name}</p>
            <Link to={`/users/${user._id}`}>Details</Link>
            <button onClick={() => handleDeleteUser(user._id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
