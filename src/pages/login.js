import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Images from "../assets/images";
import "../styles/login.css";

export default function Login() {
  const [tema, setTema] = useState("escuro");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleIcon = () => {
    setTema((prev) => (prev === "escuro" ? "claro" : "escuro"));
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    // // Lógica de login aqui
    // console.log("Login attempt:", { email, password });
    navigate('/feed');
  };

  const handleSocialLogin = (provider) => {
    // console.log(`Login with ${provider}`);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleGoToRegister = () => {
    navigate("/register");
  };

  // Ícones SVG
  const SunIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
    </svg>
  );

  const MoonIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
        clipRule="evenodd"
      />
    </svg>
  );

  const EyeIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const EyeOffIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

  const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );

  const LinkedInIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );

  const GitHubIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );

  const ArrowLeftIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );

  return (
    <div
      id="Login"
      className={tema === "escuro" ? "escuro-fundo-cinza" : "claro-fundo-bege"}
    >
      {/* Botão de Voltar */}
      <div className="iconPlaceVoltar">
        <button
          onClick={handleGoBack}
          className="voltarIcon icon"
          aria-label="Voltar para página inicial"
          title="Voltar para página inicial"
        >
          <ArrowLeftIcon />
          <span className="voltarText">Voltar</span>
        </button>
      </div>
      {/* Toggle de tema */}
      <div className="iconPlaceTema">
        <button
          className="temaIcon icon"
          onClick={toggleIcon}
          aria-label="Alternar tema"
          title={
            tema === "escuro"
              ? "Mudar para tema claro"
              : "Mudar para tema escuro"
          }
        >
          {tema === "escuro" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      {/* Área do formulário */}
      <div className="loginContent">
        <div className="loginHeader">
          <div className="logoIcon">
            <img src={Images.Logo} alt="Logo Ideafy" loading="eager" />
          </div>
          <h1 className="loginTitle">Login</h1>
          <p className="loginSubtitle">
            Bem-vindo de volta ao Ideiafy. Suas ideias têm o poder de transformar o mundo!
          </p>
        </div>

        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="email" className="inputLabel">
              Email
            </label>
            <div className="inputWrapper">
              <svg
                className="inputIcon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="teste@gmail.com"
                className="loginInput"
                required
              />
            </div>
          </div>

          <div className="inputGroup">
            <label htmlFor="password" className="inputLabel">
              Password
            </label>
            <div className="inputWrapper">
              <svg
                className="inputIcon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <circle cx="12" cy="16" r="1" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="loginInput"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="passwordToggle"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <button type="submit" className="loginButton">
            Entrar
          </button>

          <div className="divider">
            <span className="dividerText">ou</span>
          </div>

          <div className="socialButtons">
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              className="socialButton googleButton"
              aria-label="Entrar com Google"
            >
              <GoogleIcon />
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("linkedin")}
              className="socialButton linkedinButton"
              aria-label="Entrar com LinkedIn"
            >
              <LinkedInIcon />
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("github")}
              className="socialButton githubButton"
              aria-label="Entrar com GitHub"
            >
              <GitHubIcon />
            </button>
          </div>

          {/* Link para cadastro */}
          <div className="registerLink">
            <p className="registerText">
              Não tem uma conta?
              <button onClick={handleGoToRegister} className="registerButton">
                Cadastre-se aqui
              </button>
            </p>
          </div>
        </form>
      </div>

      {/* Card lateral */}
      <div className="profileCard">
        <div className="profileContent">
          <div className="profileHeader">
            <div className="profileAvatar">
              <img
                src={Images.PhotoCard}
                alt="Lucas Alves"
                className="avatarImage"
              />
              <div className="onlineStatus"></div>
            </div>
            <div className="profileInfo">
              <h3 className="profileName">Lucas Alves</h3>
              <p className="profileTime">1h</p>
            </div>
          </div>

          <p className="profileDescription">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="profileImage">
            <img
              src={Images.DeskCard}
              alt="Profile content"
              className="contentImage"
            />
            <div className="imageOverlay">
              <span className="overlayText">Vendido</span>
            </div>
          </div>

          <div className="profileActions">
            <button className="actionButton likeButton">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
            <button className="actionButton commentButton">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
            <button className="actionButton primaryButton">Comprar</button>
            <button className="actionButton secondaryButton">Contribuir</button>
          </div>
        </div>
      </div>
    </div>
  );
}
