import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AddUserForm from '../AdduserForm'
import './App.css'

function App() {
  const [userlist, setuserlist] = useState([])

  async function fetchData(){
    try{
        const res = await fetch("http://localhost:8080/api/users" , 
        {method:"GET"})
        if(!res.ok){
          throw new Error(`network response was not ok : ${res.status}`)
        }

        const data = await res.json()
        console.log(data)
        setuserlist(data)

    }catch(err)
    {
      console.log(err.message)
    }
  }
  const deleteUser = async (userid)=>{
    const confirmation = window.confirm("Czy chcesz skasowac jusera?")

    if(!confirmation) return
    try{
      const res = await fetch(`http://localhost:8080/api/users/${userid}`,{method:"DELETE"})

      if(!res.ok){
         throw new Error(`Error : ${res.status}`)
      }

      fetchData()

    }catch(err){
      console.log(err.message)
    }
  }

  return (
    <>
      <h1>Lista uzytkownikow</h1>
      <h2>Users : </h2>
      <button onClick={fetchData}>Enter</button>
      <ul style={{listStyle:"none"}}>
        {
            userlist.map(user => {
              return (
              <li key={user._id} onClick={()=>deleteUser(user._id)}>imie: {user.name},
              email : {user.email},wiek : {user.age}</li>)
            })
        }
       
      </ul>
      <AddUserForm/>
    </>
  )
}

export default App
