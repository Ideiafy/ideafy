import React, { useState, useRef, useEffect } from "react";
import Images from "../assets/images";
import "../styles/conta.css";
import Sidebar from "./componentes/sidebar";
import MobileHeader from "./componentes/mobileHeader";

export default function UserProfile({ userId = 1 }) {
  const [tema, setTema] = useState("escuro");
  const [activeNavItem, setActiveNavItem] = useState("profile");
  const [activeTab, setActiveTab] = useState("posts");
  const [lightboxImage, setLightboxImage] = useState(null);
  const [followedUsers, setFollowedUsers] = useState(new Set());
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [isFollowingUser, setIsFollowingUser] = useState(false);
  const [commentModal, setCommentModal] = useState({ isOpen: false, postId: null });
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');

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

  const VerifiedIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="userProfile-verifiedIcon">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
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

  // Componente MediaGallery (mantendo mediaWrapper e postImage)
  const MediaGallery = ({ media, postId }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    
    if (!media || media.length === 0) return null;
    
    const nextMedia = () => {
      setCurrentIndex((prev) => (prev + 1) % media.length);
    };
    
    const prevMedia = () => {
      setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    };
    
    const minSwipeDistance = 50;
    
    const handleTouchStart = (e) => {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    };
    
    const handleTouchMove = (e) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };
    
    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;
      
      if (isLeftSwipe && media.length > 1) {
        nextMedia();
      }
      if (isRightSwipe && media.length > 1) {
        prevMedia();
      }
    };
    
    const currentMedia = media[currentIndex];
    
    return (
      <div 
        className="userProfile-postImageContainer"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="mediaWrapper" onClick={() => setLightboxImage({media, currentIndex})}>
          {currentMedia.type === 'image' ? (
            <img 
              src={currentMedia.url} 
              alt={currentMedia.alt} 
              className="postImage"
              draggable={false}
            />
          ) : (
            <video 
              src={currentMedia.url} 
              className="userProfile-postVideo" 
              controls 
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            />
          )}
        </div>
        
        {media.length > 1 && (
          <>
            <button className="userProfile-mediaPrev" onClick={prevMedia}>
              <ChevronLeftIcon />
            </button>
            <button className="userProfile-mediaNext" onClick={nextMedia}>
              <ChevronRightIcon />
            </button>
            <div className="userProfile-mediaIndicators">
              {media.map((_, index) => (
                <div 
                  key={index} 
                  className={`userProfile-mediaIndicator ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  // Componente Lightbox
  const Lightbox = () => {
    const [currentIndex, setCurrentIndex] = useState(lightboxImage?.currentIndex || 0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    
    if (!lightboxImage) return null;
    
    const { media } = lightboxImage;
    
    const nextMedia = () => {
      setCurrentIndex((prev) => (prev + 1) % media.length);
    };
    
    const prevMedia = () => {
      setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    };
    
    const minSwipeDistance = 50;
    
    const handleTouchStart = (e) => {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    };
    
    const handleTouchMove = (e) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };
    
    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;
      
      if (isLeftSwipe && media.length > 1) {
        nextMedia();
      }
      if (isRightSwipe && media.length > 1) {
        prevMedia();
      }
    };
    
    const currentMedia = media[currentIndex];
    
    return (
      <div className="userProfile-lightbox" onClick={() => setLightboxImage(null)}>
        <div 
          className="userProfile-lightboxContent" 
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button className="userProfile-lightboxClose" onClick={() => setLightboxImage(null)}>
            <CloseIcon />
          </button>
          
          {currentMedia.type === 'image' ? (
            <img 
              src={currentMedia.url} 
              alt={currentMedia.alt} 
              className="userProfile-lightboxImage"
              draggable={false}
            />
          ) : (
            <video 
              src={currentMedia.url} 
              className="userProfile-lightboxVideo" 
              controls 
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            />
          )}
          
          {media.length > 1 && (
            <>
              <button className="userProfile-lightboxPrev" onClick={prevMedia}>
                <ChevronLeftIcon />
              </button>
              <button className="userProfile-lightboxNext" onClick={nextMedia}>
                <ChevronRightIcon />
              </button>
              <div className="userProfile-lightboxIndicators">
                {media.map((_, index) => (
                  <div 
                    key={index} 
                    className={`userProfile-lightboxIndicator ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // Componente Modal de Comentários
  const CommentModal = () => {
    if (!commentModal.isOpen) return null;
    
    const currentPost = userPosts.find(p => p.id === commentModal.postId);
    const postComments = comments[commentModal.postId] || [];
    
    return (
      <div className="userProfile-commentModal" onClick={closeCommentModal}>
        <div className="userProfile-commentModalContent" onClick={(e) => e.stopPropagation()}>
          <div className="userProfile-commentModalHeader">
            <h3>Comentários</h3>
            <button className="userProfile-commentModalClose" onClick={closeCommentModal}>
              <CloseIcon />
            </button>
          </div>
          
          <div className="userProfile-commentModalBody">
            <div className="userProfile-originalPost">
              <div className="userProfile-postHeader">
                <div className="userProfile-postUserAvatar">
                  <img src={currentPost?.author.avatar} alt={currentPost?.author.name} />
                  {currentPost?.author.isOnline && <div className="userProfile-onlineStatus"></div>}
                </div>
                <div className="userProfile-postUserInfo">
                  <h4 className="userProfile-postUserName">{currentPost?.author.name}</h4>
                  <span className="userProfile-postTime">{currentPost?.time}</span>
                </div>
              </div>
              <p className="userProfile-postText">{currentPost?.content}</p>
            </div>
            
            <div className="userProfile-commentsList">
              {postComments.length === 0 ? (
                <div className="userProfile-noComments">
                  <p>Seja o primeiro a comentar!</p>
                </div>
              ) : (
                postComments.map((comment) => (
                  <div key={comment.id} className="userProfile-commentItem">
                    <div className="userProfile-commentAvatar">
                      <img src={comment.avatar} alt={comment.author} />
                    </div>
                    <div className="userProfile-commentContent">
                      <div className="userProfile-commentHeader">
                        <h5 className="userProfile-commentAuthor">{comment.author}</h5>
                        <span className="userProfile-commentTime">{comment.time}</span>
                      </div>
                      <p className="userProfile-commentText">{comment.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="userProfile-addComment">
              <div className="userProfile-userAvatar">
                <img src={Images.PhotoCard || "/default-avatar.jpg"} alt="Seu avatar" />
              </div>
              <div className="userProfile-commentInputContainer">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Escreva um comentário..."
                  className="userProfile-commentInput"
                  rows="1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      addComment();
                    }
                  }}
                />
                <button 
                  className="userProfile-sendComment" 
                  onClick={addComment}
                  disabled={!newComment.trim()}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </button>
              </div>  
            </div>
          </div>
        </div>
      </div>
    );
  };

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
    <img src={userData.avatar} alt={userData.name} className="userProfile-avatar" />
    {userData.isOnline && <div className="userProfile-onlineStatus"></div>}
  </div>
  
  <div className="userProfile-info">
    <div className="userProfile-details">
      <div className="userProfile-nameSection">
        <h1 className="userProfile-name">
          {userData.name}
          {userData.verified && <VerifiedIcon />}
        </h1>
        <span className="userProfile-username">{userData.username}</span>
      </div>
      
      <button 
        className={`userProfile-followBtn ${isFollowingUser ? 'following' : ''}`}
        onClick={toggleFollowUser}
      >
        {isFollowingUser ? 'Seguindo' : 'Seguir'}
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
              {userPosts.map((post) => (
                <article key={post.id} className="userProfile-postCard">
                  <div className="userProfile-postHeader">
                    <div className="userProfile-postUserAvatar">
                      <img src={post.author.avatar} alt={post.author.name} />
                      {post.author.isOnline && <div className="userProfile-onlineStatus"></div>}
                    </div>
                    <div className="userProfile-postUserInfo">
                      <h4 className="userProfile-postUserName">{post.author.name}</h4>
                      <span className="userProfile-postTime">{post.time}</span>
                    </div>
                  </div>

                  <p className="userProfile-postText">{post.content}</p>

                  {post.media.length > 0 && (
                    <MediaGallery media={post.media} postId={post.id} />
                  )}

                  <div className="userProfile-postActions">
                    <button 
                      className={`userProfile-actionBtn userProfile-like ${likedPosts.has(post.id) ? 'liked' : ''}`}
                      onClick={() => toggleLike(post.id)}
                    >
                      <HeartIcon />
                      <span className="userProfile-actionCount">
                        {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                      </span>
                    </button>
                    <button 
                      className="userProfile-actionBtn userProfile-comment" 
                      onClick={() => openCommentModal(post.id)}
                    >
                      <CommentIcon />
                      <span className="userProfile-actionCount">{(comments[post.id] || []).length || post.comments}</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeTab === 'media' && (
            <div className="userProfile-mediaGrid">
              {userPosts.filter(post => post.media.length > 0).map((post) => 
                post.media.map((media, index) => (
                  <div 
                    key={`${post.id}-${index}`} 
                    className="userProfile-mediaItem"
                    onClick={() => setLightboxImage({media: post.media, currentIndex: index})}
                  >
                    <img src={media.url} alt={media.alt} />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>

      <Lightbox />
      <CommentModal />
    </div>
  );
}