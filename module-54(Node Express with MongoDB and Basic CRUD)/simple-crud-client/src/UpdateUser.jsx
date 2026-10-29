import { useLoaderData, useNavigate } from "react-router";

const UpdateUser = () => {
  const user = useLoaderData();
  console.log(user);
  const navigate = useNavigate();
  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    fetch(`http://localhost:3500/users/${user._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
            alert('User info updated Successfully!')
            navigate('/users')
        }
      });
  };
  return (
    <div>
      <h1>Update user info</h1>
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" defaultValue={user.name} /> <br />
        <input type="email" name="email" defaultValue={user.email} />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default UpdateUser;
