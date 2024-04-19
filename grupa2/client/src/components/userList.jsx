import { useState ,useEffect } from "react"
import axios from "axios"
import AddUserForm from "./AdduserForm"


const UserList = ()=>{
    const [userlist, setuserlist] = useState([])

    async function fetchData(){
      try{
        const response = await axios.get("http://localhost:8080/api/users")
        setuserlist(response.data)
      }
          // const res = await fetch("http://localhost:8080/api/users" , 
          // {method:"GET"})
          // if(!res.ok){
          //   throw new Error(`network response was not ok : ${res.status}`)
          // }
  
          // const data = await res.json()
          // console.log(data)
          // setuserlist(data)
  
      catch(err)
      {
        console.log(err.message)
      }
    }
    const deleteUser = async (userid)=>{
      const confirmation = window.confirm("Czy chcesz skasowac jusera?")
  
      if(!confirmation) return
      try{
        const response = await axios.delete(`http://localhost:8080/api/users/${userid}`)
        if(!res.ok){
              throw new Error(`Error : ${res.status}`)
           }
           fetchData()
        // const res = await fetch(`http://localhost:8080/api/users/${userid}`,{method:"DELETE"})
  
        // if(!res.ok){
        //    throw new Error(`Error : ${res.status}`)
        // }
  
        // fetchData()
  
      }catch(err){
        console.log(err.message)
      }
    }

    useEffect(()=>{fetchData},[])
    
    return(
        <>
            <h3>Lista uzytkownikow</h3>
            <h2>Users : </h2>
            <button onClick={fetchData}>Enter</button>
            <ul style={{listStyle:"none"}}>
            {
                userlist.map(user => {
                    return (
                    <li key={user._id} onClick={()=>deleteUser(user._id)}>imie: {user.name},
                    email : {user.email},wiek : {user.age},
                    <img src={user.imageUrl} alt='user'/></li>)
                })
}
    </ul>
    <AddUserForm/>
        </>
    )
}
export default UserList