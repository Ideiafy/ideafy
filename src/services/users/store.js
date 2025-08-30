import api from './../api'

export default async function store(name,username,email,password)
{
     console.log("Register attempt2:", { name,email, username, password });
    const response = await api.post('users/store',{
        name:name,
        username:username,
        email: email,
        password:password
   })
   return response;
}