import { Link, useLoaderData, useNavigate } from "react-router";

const UserDetail = () => {
    const user = useLoaderData()
    console.log(user)
    const navigate = useNavigate()
    return (
        <div>
            <h2>Users detail</h2>
            <p>{user.name}</p>
            <button onClick={()=> navigate(-1)}>Go Back</button>
            <Link to={`/update/${user._id}`}>Update</Link>
        </div>
    );
};

export default UserDetail;