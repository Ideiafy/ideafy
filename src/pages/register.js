import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Images from "../assets/images";
import "../styles/register.css";
import store from "./../services/users/store"

export default function Register() {
  const [tema, setTema] = useState("escuro");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps] = useState(5);
  const [alert, setAlert] = useState({
  isOpen: false,
  type: '', // 'error', 'success'
  title: '',
  message: '',
  details: ''
});

const [fieldErrors, setFieldErrors] = useState({
  username: false,
  email: false
});
  const navigate = useNavigate();

  const toggleIcon = () => {
    setTema((prev) => (prev === "escuro" ? "claro" : "escuro"));
  };

  // async function  handleSubmit (e) {
  //   e.preventDefault();
    
  //   if (currentStep < totalSteps) {
  //       // Validações por step
  //       if (currentStep === 1 && !name.trim()) {
  //           alert('Por favor, digite seu  nome completo ');
  //           return;
  //       }

  //        if (currentStep === 2 && !username.trim()) {
  //           alert('Por favor, digite um nome de usuário');
  //           return;
  //       }

  //       if (currentStep === 3 && !email.trim()) {
  //           alert('Por favor, digite um email válido');
  //           return;
  //       }
  //       if (currentStep === 4 && !password.trim()) {
  //           alert('Por favor, digite uma senha');
  //           return;
  //       }

       
        
  //       setCurrentStep(currentStep + 1);
  //   } else {
  //       // Última etapa - validação final e envio
  //       if (password !== confirmPassword) {
  //           alert('As senhas não coincidem');
  //           return;
  //       }
        
  //       // Lógica de registro aqui

  //       console.log("Register attempt:", { name,username,email, password });

  //       const response = await store(name,username,email,password);
  //       if(response.status == 200)
  //       {
  //         navigate('/login');
  //       }
  //     }


  // };

  const showAlert = (type, title, message, details = '') => {
  setAlert({
    isOpen: true,
    type,
    title,
    message,
    details
  });

  // Auto fechar após 5 segundos se for sucesso
  if (type === 'success') {
    setTimeout(() => {
      setAlert({ isOpen: false, type: '', title: '', message: '', details: '' });
    }, 5000);
  }
};
const closeAlert = () => {
  setAlert({ isOpen: false, type: '', title: '', message: '', details: '' });
};
const validateUsername = async (username) => {
  // Simular verificação no servidor
  // const response = await checkUsernameAvailable(username);
  // return response.available;
  
  // Para teste, simular que alguns usernames já existem
  const unavailableUsernames = ['admin', 'test', 'user', 'lucas', 'ideafy'];
  return !unavailableUsernames.includes(username.toLowerCase());
};

const validateEmail = async (email) => {
  // Simular verificação no servidor
  // const response = await checkEmailAvailable(email);
  // return response.available;
  
  // Para teste, simular que alguns emails já existem
  const unavailableEmails = ['admin@test.com', 'test@test.com', 'lucas@exemplo.com'];
  return !unavailableEmails.includes(email.toLowerCase());
};

async function handleSubmit(e) {
  e.preventDefault();
  
  if (currentStep < totalSteps) {
    // Validações por step
    // if (currentStep === 1 && !name.trim()) {
    //   showAlert('error', 'Nome obrigatório', 'Por favor, digite seu nome completo para continuar.');
    //   return;
    // }

    if (currentStep === 2 && !username.trim()) {
      showAlert('error', 'Username obrigatório', 'Por favor, digite um nome de usuário para continuar.');
      return;
    }

    // Verificar se username já existe
    if (currentStep === 2 && username.trim()) {
      const isUsernameAvailable = await validateUsername(username);
      if (!isUsernameAvailable) {
        setFieldErrors(prev => ({ ...prev, username: true }));
        showAlert(
          'error', 
          'Username indisponível', 
          'Este nome de usuário já está sendo usado por outro usuário.',
          'Tente algo como: @' + username + Math.floor(Math.random() * 1000)
        );
        return;
      } else {
        setFieldErrors(prev => ({ ...prev, username: false }));
      }
    }

    if (currentStep === 3 && !email.trim()) {
      showAlert('error', 'Email obrigatório', 'Por favor, digite um email válido para continuar.');
      return;
    }

    // Verificar se email já existe
    if (currentStep === 3 && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showAlert('error', 'Email inválido', 'Por favor, digite um endereço de email válido.');
        return;
      }

      const isEmailAvailable = await validateEmail(email);
      if (!isEmailAvailable) {
        setFieldErrors(prev => ({ ...prev, email: true }));
        showAlert(
          'error', 
          'Email já cadastrado', 
          'Este email já possui uma conta cadastrada.',
          'Tente fazer login ou use outro email.'
        );
        return;
      } else {
        setFieldErrors(prev => ({ ...prev, email: false }));
      }
    }

    if (currentStep === 4 && !password.trim()) {
      showAlert('error', 'Senha obrigatória', 'Por favor, digite uma senha para continuar.');
      return;
    }

    if (currentStep === 4 && password.length < 6) {
      showAlert('error', 'Senha muito curta', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    
    setCurrentStep(currentStep + 1);
  } else {
    // Última etapa - validação final e envio
    if (password !== confirmPassword) {
      showAlert('error', 'Senhas não coincidem', 'As senhas digitadas não são iguais. Verifique e tente novamente.');
      return;
    }
    
    try {
      console.log("Register attempt:", { name, username, email, password });

      // Simular chamada de API
      showAlert('success', 'Conta criada com sucesso!', 'Bem-vindo ao Ideafy! Você será redirecionado para fazer login.');
      
      // const response = await store(name, username, email, password);
      // if(response.status == 200) {
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      // }
    } catch (error) {
      showAlert('error', 'Erro ao criar conta', 'Ocorreu um erro inesperado. Tente novamente em alguns instantes.');
    }
  }
}

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  const handleGoBack = () => {
    navigate("/");
  };


  const handlePreviousStep = () => {
    if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
    }

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
  const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
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
          <h1 className="loginTitle">Cadastro</h1>
          <p className="loginSubtitle">
            Junte-se ao Ideiafy e dê vida às suas ideias. Aqui, cada pensamento pode se tornar realidade!
          </p>
        </div>

        <form className="loginForm" onSubmit={handleSubmit} >
    {/* Indicador de progresso */}
    <div className="stepIndicator">
        <div className="stepProgress">
            <div 
                className="stepProgressBar" 
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
        </div>
        <span className="stepText">Etapa {currentStep} de {totalSteps}</span>
    </div>

     {/* Step 1 - Full Name */}
    {currentStep === 1 && (
        <div className="inputGroup">
            <label htmlFor="username" className="inputLabel">Nome Completo</label>
            <div className="inputWrapper">
                <svg className="inputIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
                <input
    id="username"
    type="text"
    value={username}
    onChange={(e) => {
        setUsername(e.target.value);
        // Limpar erro quando usuário começar a digitar
        if (fieldErrors.username) {
            setFieldErrors(prev => ({ ...prev, username: false }));
        }
    }}
    placeholder="Digite seu nome de usuário"
    className={`loginInput ${fieldErrors.username ? 'error' : ''}`}
    autoFocus
    required
/>
            </div>
        </div>
    )}

    {/* Step 2 - Username */}
    {currentStep === 2 && (
        <div className="inputGroup">
            <label htmlFor="username" className="inputLabel">Nome de usuário</label>
            <div className="inputWrapper">
                <svg className="inputIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Digite seu nome de usuário"
                    className="loginInput"
                    autoFocus
                    required
                />
            </div>
        </div>
    )}

    {/* Step 3 - Email */}
    {currentStep === 3 && (
        <div className="inputGroup">
            <label htmlFor="email" className="inputLabel">Email</label>
            <div className="inputWrapper">
                <svg className="inputIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
    id="email"
    type="email"
    value={email}
    onChange={(e) => {
        setEmail(e.target.value);
        // Limpar erro quando usuário começar a digitar
        if (fieldErrors.email) {
            setFieldErrors(prev => ({ ...prev, email: false }));
        }
    }}
    placeholder="seu@email.com"
    className={`loginInput ${fieldErrors.email ? 'error' : ''}`}
    autoFocus
    required
/>
            </div>
        </div>
    )}

    {/* Step 4 - Password */}
    {currentStep === 4 && (
        <div className="inputGroup">
            <label htmlFor="password" className="inputLabel">Senha</label>
            <div className="inputWrapper">
                <svg className="inputIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <circle cx="12" cy="16" r="1"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="loginInput"
                    autoFocus
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
    )}

    {/* Step 5 - Confirm Password */}
    {currentStep === 5 && (
        <div className="inputGroup">
            <label htmlFor="confirmPassword" className="inputLabel">Confirmar Senha</label>
            <div className="inputWrapper">
                <svg className="inputIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <circle cx="12" cy="16" r="1"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="loginInput"
                    autoFocus
                    required
                />
            </div>
        </div>
    )}

    {/* Botões de navegação */}
    <div className="stepButtons">
        {currentStep > 1 && (
            <button 
                type="button" 
                onClick={handlePreviousStep}
                className="stepButton secondaryButton"
            >
                Voltar
            </button>
        )}
        <button type="submit" className="stepButton loginButton">
            {currentStep === totalSteps ? 'Cadastrar' : 'Próximo'}
        </button>
    </div>

    {/* Resto do conteúdo - divider, social buttons, etc. permanece igual */}
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

    <div className="registerLink">
        <p className="registerText">
            Já tem uma conta? 
            <button onClick={() => navigate('/login')} className="registerButton">
                Faça login
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
      {alert.isOpen && (
  <div className={`custom-alert ${alert.type}`}>
    <div className="alert-backdrop" onClick={closeAlert}></div>
    <div className="alert-content">
      <div className="alert-header">
        <div className="alert-icon">
          {alert.type === 'error' ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22,4 12,14.01 9,11.01"/>
            </svg>
          )}
        </div>
        <button onClick={closeAlert} className="alert-close">
          <XIcon />
        </button>
      </div>
      
      <div className="alert-body">
        <h3 className="alert-title">{alert.title}</h3>
        <p className="alert-message">{alert.message}</p>
        {alert.details && (
          <p className="alert-details">{alert.details}</p>
        )}
      </div>
      
      {alert.type === 'error' && (
        <div className="alert-actions">
          <button onClick={closeAlert} className="alert-button primary">
            Entendi
          </button>
        </div>
      )}
    </div>
  </div>
)}
    </div>
  );
}
