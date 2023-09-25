import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [users, setUsers]= useState([])
  
  useEffect(()=>{
    fetch(`http://localhost:5000/users`)
      .then(res=>res.json())
      .then(data=>setUsers(data))
  },[])

  const handleAddUser= event =>{
    event.preventDefault()
    const form = event.target;
    const name= form.name.value;
    const age= form.age.value;
    const email= form.email.value;
    const phone= form.phone.value;
    const user= {name, age, email, phone}
    console.log(user)
    fetch(`http://localhost:5000/users`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    },
    )
    .then(res=> res.json())
    .then(data=> {
      console.log(data)
      const newUsers= [...users, data]
      setUsers(newUsers)
      form.reset()
    })
  }
  return (
    <div>
      <h1>User management system</h1>
      <h2>Users: {users.length} </h2>
        <form onSubmit={handleAddUser}>
          <input type="text" id="name" name="name" placeholder="Name" required/><br></br>
          <input type="number" id="age" name="age" placeholder="Age" required/><br></br>
          <input type="email" id="email" name="email" placeholder="Email" required/><br></br>
          <input type="tel" id="phone" name="phone" placeholder="Phone" required/><br></br>
          <input type="submit" value="Submit"/>
        </form>

      <div>
        {
        users.map(user=> <li key={user.id}> {user.name} {user.age} {user.email} {user.phone} </li>)
        }
      </div>

    </div>

  )
}

export default App;
