import api from './../api'

export default async function store(formData, token) {
  try {
    for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}


    const response = await api.post('posts', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', 
      },
    });
    return response;
  } catch (error) {
    console.error("Erro ao enviar o post:", error);
    throw error;
  }
}
