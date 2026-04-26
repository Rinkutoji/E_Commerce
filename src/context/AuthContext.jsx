import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function useAuth(){
    return useContext(AuthContext)
}
export function AuthProvider({children}){
    const[user,setUser] = useState(()=>{
        try {return JSON.parse(localStorage.getItem('user'))} catch {return null}
    })
    async function login(username,password){
        const registerUsers = JSON.parse(localStorage.getItem('registered_users')|| '[]')
        const localUser = registerUsers.find(
            u=>u.username === username && u.password === password
        )
        if(localUser){
            const userData = {
                username:localUser.username,
                email: localUser.email,
                firstname: localUser.firstname,
                lastname: localUser.lastname,
                token: 'local_' + localUser.id,
            }
            setUser(userData)
            localStorage.setItem('user',JSON.stringify(userData))
            return
        }
        const res= await fetch('https://fakestoreapi.com/auth/login',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({username,password}),
        })
        if(!res.ok)throw new Error('login failed')
            const data = await res.json()
            const userData = {username, token:data.token}
            setUser(userData)
            localStorage.setItem('user',JSON.stringify(userData))
    }
    function logout(){
        setUser(null)
        localStorage.removeItem('user')

    }
    return(
        <AuthContext.Provider value={{user,login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}