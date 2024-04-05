import { useState } from "react"

const AddUserForm = ({updateuserlist})=>{
    const [newUser , setnewUser] = useState({name:"" , email:"",age:0})

    async function submitHandler(e){
        e.preventDefault()
        try{

            const res = await fetch("http://localhost:8080/api/users" , 
            {
                method:"POST" , 
                headers:{'Content-type':'application/json'} , 
                body:JSON.stringify(newUser)
            })
            
            if(!res.ok){
                throw new Error(`Netłork response was not ok ${res.status}`)
            }

            const data =await res.json()
            console.log(data)

            setnewUser({name:"",email:"" , age:0})
            updateuserlist()

        }catch(err){
            console.error(`Something łent wrong : ${err.message}`)
        }
    }

    return(
        <>
            <h4>Add new juser</h4>
            <form onSubmit={submitHandler}>
                <input type="text" placeholder="wprowadz imie" 
                    value={newUser.name} 
                    onChange={e=>setnewUser({...newUser , name: e.target.value})}/>
                <input type="email" placeholder="wprowadz email" 
                    value={newUser.email}
                     onChange={e=>setnewUser({...newUser , email: e.target.value})}/>
                <input type="number" placeholder="wprowadz wiek"
                     value={newUser.age}
                     onChange={e=>setnewUser({...newUser , age: e.target.value})}/>

                <button type="submit" >Add user</button>
            </form>
        </>
    )
}
export default AddUserForm