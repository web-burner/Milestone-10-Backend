
import './App.css'
import Users from './Users'

const usersPromise = fetch('http://localhost:3500/users').then(res => res.json())

function App() {

  return (
    <>
    <h1>Create User</h1>
    <Users usersPromise={usersPromise} />
    </>
  )
}

export default App
