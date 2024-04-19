import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AddUserForm from './components/AdduserForm'
import './App.css'
import UserList from './components/userList'
import { Route , Routes , Link , useNavigate } from 'react-router-dom'

function App() {
const navigate = useNavigate()

  return(
    <>
    <h1>M E R N - menadżer więzienia</h1>
    <nav>
      <ul>
        <li>
          <Link to="/users">Show user list</Link>
        </li>
        <li>
          <button onClick={()=>navigate("/add-user")}>Add a new user</button>
        </li>
      </ul>
    </nav>
    <Routes>
      <Route path='/users' element={<UserList/>}/>
      <Route path='/add-user' element={<AddUserForm/>}/>
      <Route path='/' element={<div><h1>Welcome</h1></div>}/>
    </Routes>
    </>
  )
  
}
export default App
