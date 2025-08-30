import React, { useState, useRef, useEffect } from "react";
import Images from "../assets/images";
import "../styles/conta.css";
import Sidebar from "./componentes/sidebar";
import MobileHeader from "./componentes/mobileHeader";
import { useNavigate } from 'react-router-dom';
import Card from '../pages/componentes/card';
import logged from "./../services/users/logged"
import findToken from "./../services/auth/token"

export default function UserProfile({ userId = 1 }) {
  const [tema, setTema] = useState("escuro");
  const [activeNavItem, setActiveNavItem] = useState("profile");
  const [activeTab, setActiveTab] = useState("posts");
  const [followedUsers, setFollowedUsers] = useState(new Set());
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [isFollowingUser, setIsFollowingUser] = useState(false);
  const [commentModal, setCommentModal] = useState({ isOpen: false, postId: null });
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [user,setUser] = useState(null)
  const navigate = useNavigate();

   async function fetchUserData(token)
    {
      const response = await logged(token)
      setUser(response.data)
    }

  useEffect(() => {
    const token = findToken()
    fetchUserData(token)
  },[])

  const toggleTema = () => {
    setTema((prev) => (prev === "escuro" ? "claro" : "escuro"));
  };

  const handleNavigation = (item) => {
    setActiveNavItem(item);
  };

  const toggleFollow = (postUserId) => {
    setFollowedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postUserId)) {
        newSet.delete(postUserId);
      } else {
        newSet.add(postUserId);
      }
      return newSet;
    });
  };

  const toggleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleFollowUser = () => {
    setIsFollowingUser(prev => !prev);
  };

  // Mock data do usuário
  const userData = {
    id: userId,
    name: "Lucas Alves",
    username: "@lucasalves",
    bio: "Desenvolvedor Full Stack apaixonado por tecnologia e inovação. Criando soluções que fazem a diferença no mundo digital.",
    avatar: Images.PhotoCard || "/default-avatar.jpg",
    coverImage: Images.Banner3 || "/default-cover.jpg",
    joinDate: "Março 2022",
    isOnline: true,
    verified: true,
    stats: {
      posts: 124,
      followers: 2847,
      following: 892
    }
  };

  // Posts do usuário
  const userPosts = [
    {
      id: 1,
      author: userData,
      content: "Acabei de finalizar um projeto incrível usando React e Node.js! A sensação de ver tudo funcionando perfeitamente é indescritível. 🚀",
      media: [
        {
          type: "image",
          url: Images.DeskCard || "/default-post.jpg",
          alt: "Projeto finalizado"
        }
      ],
      likes: 45,
      comments: 12,
      time: "2h",
      isLiked: false
    },
    {
      id: 2,
      author: userData,
      content: "Compartilhando algumas dicas de UI/UX que aprendi esta semana. O design é muito mais do que apenas fazer algo bonito - é sobre criar experiências memoráveis!",
      media: [
        {
          type: "image",
          url: Images.Banner2,
          alt: "UI/UX Design"
        },
        {
          type: "image",
          url: Images.Banner1,
          alt: "Design Process"
        }
      ],
      likes: 78,
      comments: 23,
      time: "1d",
      isLiked: true
    },
    {
      id: 3,
      author: userData,
      content: "Hoje foi dia de contribuir com open source! Nada melhor do que retribuir para a comunidade que tanto me ensinou.",
      media: [],
      likes: 32,
      comments: 8,
      time: "3d",
      isLiked: false
    }
  ];

  // Modal e componentes do feed original
  const openCommentModal = (postId) => {
    setCommentModal({ isOpen: true, postId });
    setNewComment('');
  };

  const closeCommentModal = () => {
    setCommentModal({ isOpen: false, postId: null });
    setNewComment('');
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    
    const postId = commentModal.postId;
    const comment = {
      id: Date.now(),
      text: newComment.trim(),
      author: 'Você',
      avatar: Images.PhotoCard || "/default-avatar.jpg",
      time: 'agora'
    };
    
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), comment]
    }));
    
    setNewComment('');
  };

  // Componentes auxiliares (copiados do feed original)
  const HeartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );

  const CommentIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );

  const CloseIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );

  const ChevronLeftIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15,18 9,12 15,6"/>
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9,18 15,12 9,6"/>
    </svg>
  );



  const CalendarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );


  return (
    <div id="UserProfile" className={tema === "escuro" ? "escuro-fundo-cinza" : "claro-fundo-bege"}>
      {/* Header Mobile - mantendo "Ideiafy" fixo */}
      <MobileHeader tema={tema} toggleTema={toggleTema} title="Ideiafy" />

      {/* Sidebar */}
      <Sidebar 
        tema={tema}
        toggleTema={toggleTema}
        activeItem={'account'}
        onNavigate={handleNavigation}
      />

      {/* Conteúdo Principal */}
      <main className="userProfile-mainContent">
        {/* Cover e Avatar - Banner atrás da foto */}
        <div className="userProfile-header">
  {/* Avatar centralizado no topo */}
  <div className="userProfile-avatarContainer">
    <img src={userData.avatar} alt={ user?.name || "Loading..."} className="userProfile-avatar" />
    {userData.isOnline && <div className="userProfile-onlineStatus"></div>}
  </div>
  
  <div className="userProfile-info">
    <div className="userProfile-details">
      <div className="userProfile-nameSection">
        <h1 className="userProfile-name">
          { user?.name || "Loading..."}
        </h1>
        <span className="userProfile-username">{ user?.username || "Loading..."}</span>
      </div>
      
      <button 
  className="userProfile-settingsBtn"
  onClick={() => {
    navigate('/configuracoes');
    console.log('Navegar para configurações');
  }}
>
  Editar Perfil
</button>
    </div>
  </div>
</div>

        {/* Bio e informações */}
        <div className="userProfile-bio">
          <p className="userProfile-bioText">{userData.bio}</p>
          
          <div className="userProfile-meta">
            <div className="userProfile-metaItem">
              <CalendarIcon />
              <span>Entrou em {userData.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="userProfile-stats">
          <div className="userProfile-statItem">
            <span className="userProfile-statNumber">{userData.stats.posts}</span>
            <span className="userProfile-statLabel">Posts</span>
          </div>
          <div className="userProfile-statItem">
            <span className="userProfile-statNumber">{userData.stats.followers.toLocaleString()}</span>
            <span className="userProfile-statLabel">Seguidores</span>
          </div>
          <div className="userProfile-statItem">
            <span className="userProfile-statNumber">{userData.stats.following}</span>
            <span className="userProfile-statLabel">Seguindo</span>
          </div>
        </div>

        {/* Navegação por abas - Removido "Curtidas" */}
        <div className="userProfile-tabs">
          <button 
            className={`userProfile-tabButton ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          <button 
            className={`userProfile-tabButton ${activeTab === 'media' ? 'active' : ''}`}
            onClick={() => setActiveTab('media')}
          >
            Mídia
          </button>
        </div>

        {/* Conteúdo das abas */}
<div className="userProfile-tabContent">
  {activeTab === 'posts' && (
    <div className="userProfile-postsContent">
        <Card/>
        {/* <div className="userProfile-emptyState">
          Nenhum post ainda
        </div> */}
    </div>
  )}
  
  {activeTab === 'media' && (
    <div className="userProfile-mediaGrid">
      {(() => {
        const mediaItems = userPosts
          .filter(post => post.media && post.media.length > 0)
          .flatMap(post => 
            post.media.map((media, index) => ({
              id: `${post.id}-${index}`,
              url: media.url,
              alt: media.alt
            }))
          );

        return mediaItems.length > 0 ? (
          mediaItems.map(media => (
            <div key={media.id} className="userProfile-mediaItem">
              <img src={media.url} alt={media.alt} />
            </div>
          ))
        ) : (
          <div className="userProfile-emptyState">
            Nenhuma mídia ainda
          </div>
        );
      })()}
    </div>
  )}
</div>
      </main>
        

    </div>
  );
}