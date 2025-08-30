import api from './../api'

export default async function logged(token)
{
    const response = await api.get('/logged',{
        headers: {
        Authorization: `Bearer ${token}`
      },
    })
    return response;
}