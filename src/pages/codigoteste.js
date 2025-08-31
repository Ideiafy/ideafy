// claude mandou para a parte de adicionar foto de perfil do avatar no caso para usar 
// na api

// 2. OPCIONAL: Adicione esta função para enviar para o servidor (descomente quando necessário)
/*
const uploadAvatarToServer = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  
  try {
    const token = findToken();
    const response = await fetch('/api/user/avatar', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Avatar enviado para servidor:', data);
    } else {
      throw new Error('Erro ao enviar avatar');
    }
  } catch (error) {
    console.error('Erro no upload:', error);
    alert('Erro ao salvar a imagem');
  }
};
*/

// // 3. ALTERE também a seção do avatar para usar o estado correto:

// // Se estiver na página de PERFIL (UserProfile), use:
// <div className="userProfile-avatarContainer">
//   {(user?.avatar || userProfile?.avatar) ? (
//     <img 
//       src={user?.avatar || userProfile?.avatar} 
//       alt={user?.name || "Loading..."} 
//       className="userProfile-avatar"
//       onError={(e) => {
//         e.target.style.display = 'none';
//         e.target.nextElementSibling.style.display = 'flex';
//       }}
//     />
//   ) : null}
  
//   <div 
//     className={`userProfile-avatarPlaceholder ${!(user?.avatar || userProfile?.avatar) ? 'show' : ''}`}
//     style={{ display: !(user?.avatar || userProfile?.avatar) ? 'flex' : 'none' }}
//   >
//     <CameraIcon />
//   </div>
  
//   {userData.isOnline && <div className="userProfile-onlineStatus"></div>}
// </div>

// // Se estiver na página de CONFIGURAÇÕES, use:
// <div className="modern-avatar-container">
//   {(user?.avatar || userProfile?.avatar) ? (
//     <img
//       src={user?.avatar || userProfile?.avatar}
//       alt={user?.name || "Loading..."}
//       className="modern-avatar"
//       onError={(e) => {
//         e.target.style.display = 'none';
//         e.target.nextElementSibling.style.display = 'flex';
//       }}
//     />
//   ) : null}
  
//   <div 
//     className={`modern-avatar-placeholder ${!(user?.avatar || userProfile?.avatar) ? 'show' : ''}`}
//     style={{ display: !(user?.avatar || userProfile?.avatar) ? 'flex' : 'none' }}
//   >
//     <CameraPlaceholderIcon />
//   </div>
  
//   <label className="modern-avatar-edit">
//     <CameraIcon />
//     <input
//       type="file"
//       accept="image/*"
//       onChange={handleAvatarChange}
//       hidden
//     />
//   </label>
// </div>