import "./App.css";
import Users from "./component/Users";

const userPromise = fetch("http://localhost:3500/users").then((res) => res.json());
function App() {
  return (
    <>
      <h1>Welcome to Crud Client </h1>

      <Users userPromise={userPromise} />
    </>
  );
}

export default App;
