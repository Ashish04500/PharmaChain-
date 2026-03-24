import { getUsers, approveUser } from "../utils/auth";
import { useState } from "react";

export default function Admin(){

const [users,setUsers]=useState(getUsers());

// 🔐 login states
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [isLoggedIn,setIsLoggedIn]=useState(false);

// 🔐 login function
function login(){
  if(email === "admin@gmail.com" && password === "Admin@Hackathon2026!"){
    setIsLoggedIn(true);
  } else {
    alert("Invalid credentials");
  }
}

function approve(address){
  approveUser(address);
  setUsers(getUsers());
}

// 🔒 if not logged in → show login UI
if(!isLoggedIn){
  return(
    <div className="container">
      <h2>Admin Login</h2>

      <input
        type="email"
        placeholder="Enter Gmail"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </div>
  )
}

return(

<div className="container">

<h2>Admin Dashboard</h2>

{users.map(u=>(
<div className="card" key={u.address}>

<p><b>{u.name}</b></p>
<p>{u.role}</p>
<p>{u.address}</p>

{u.approved ? (
<p>Approved</p>
) : (
<button onClick={()=>approve(u.address)}>
Approve
</button>
)}

</div>
))}

</div>

)

}