import api from '../api'

export default async function login(email,password)
{
   const response = await api.post('/auth/login',{
        email: email,
        password:password
   })
 

  const token = response.data["token:"]; 
  return token;
}



