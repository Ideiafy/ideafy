import React, { useState } from "react";
import "../../styles/card.css";
import { useNavigate } from "react-router-dom";
import Images from "./../../assets/images";

export default function Card({ additionalPosts = [] }) {
  const [likedPosts, setLikedPosts] = useState(new Set());
  const navigate = useNavigate();

  const UserConta = () => {
    navigate("/UserConta");
  };

  const allPosts = [...additionalPosts];
  console.log(allPosts);

  // Ícones SVG
  const HeartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );

  const CommentIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );

  // Função para curtir posts
  const toggleLike = (postId) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) newSet.delete(postId);
      else newSet.add(postId);
      return newSet;
    });
  };

  return (
    <div className="userProfile-postImageContainer">
      {allPosts.map((post) => (
        <article key={post.id} className="userProfile-postCard">
          <div className="userProfile-postHeader">
            <div className="userProfile-postUserAvatar" onClick={UserConta}>
              <img src={post.user?.avatar || "/default-avatar.jpg"} alt={post.user?.name || "Usuário"} />
              {post.user?.isOnline && <div className="userProfile-onlineStatus"></div>}
            </div>
            <div className="userProfile-postUserInfo">
              <h4 className="userProfile-postUserName">{post.user?.name || "Usuário"}</h4>
              <span className="userProfile-postTime">{new Date(post.created_at).toLocaleString()}</span>
            </div>
          </div>

          <p className="userProfile-postText">{post.description}</p>

          {post.media_path && (
            post.media_type === "image" ? (
              <img src={Images.Banner3} alt={post.title} className="postImage" />
            ) : (
               <img src="./../../assets/images/banner1.jpg" alt={post.title} className="postImage" />
              //<video src={post.media_path} className="userProfile-postVideo" controls />
            )
          )}

          <div className="userProfile-postActions">
            <button
              className={`userProfile-actionBtn userProfile-like ${likedPosts.has(post.id) ? "liked" : ""}`}
              onClick={() => toggleLike(post.id)}
            >
              <HeartIcon />
              <span className="userProfile-actionCount">
                {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
              </span>
            </button>
            <button className="userProfile-actionBtn userProfile-comment">
              <CommentIcon />
              
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
