import React, { useState } from "react";
import Sidebar from "./componentes/sidebar";
import Images from '../assets/images';
import "../styles/configuracoes.css";
import MobileHeader from "./componentes/mobileHeader";

export default function MinhaContaPage() {
  const [tema, setTema] = useState("escuro");
  const [activeNavItem, setActiveNavItem] = useState("minha-conta");
  const [activeTab, setActiveTab] = useState("pessoais");
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Estados do usuário
  const [userProfile, setUserProfile] = useState({
    name: "Lucas Alves",
    email: "lucas@exemplo.com",
    username: "lucasalves",
    bio: "Designer e desenvolvedor apaixonado por criar experiências incríveis.",
    joinDate: "Janeiro 2024",
    avatar: Images.PhotoCard
  });


  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    username: userProfile.username,
    bio: userProfile.bio,
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const toggleTema = () => {
    setTema(prev => prev === "escuro" ? "claro" : "escuro");
  };

  const handleNavigation = (item) => {
    setActiveNavItem(item);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Uploading avatar:", file);
    }
  };
  const handleLogout = () => {
  if (window.confirm("Tem certeza que deseja sair da sua conta?")) {
    // Aqui você implementa a lógica de logout
    console.log("Logout realizado");
    // Exemplo: limpar localStorage, redirecionar, etc.
  }
};

const handleSaveProfile = () => {
  setUserProfile(prev => ({
    ...prev,
    name: formData.name,
    username: formData.username,
    bio: formData.bio
    // Remover: location: formData.location
  }));
  console.log("Profile saved:", formData);
};

  const handleChangePassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Senhas não coincidem");
      return;
    }
    console.log("Password changed");
  };

  // Ícones SVG otimizados
  const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  const ShieldIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );


  const SettingsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );

  const CameraIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
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

  const LogOutIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16,17 21,12 16,7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  );
  const renderTabContent = () => {
    switch (activeTab) {
      case "pessoais":
        return (
          
          
          <div className="tab-content">
            <MobileHeader tema={tema} toggleTema={toggleTema} title="Ideafy" />
            <div className="content-header">
              <h2 className="content-title">Informações Pessoais</h2>
              <p className="content-description">Gerencie suas informações de perfil</p>
            </div>
            
            <div className="modern-form-card">
              <div className="form-row">
                <div className="modern-input-group">
                  <label className="modern-label">Nome Completo</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="modern-input"
                    placeholder="Digite seu nome completo"
                  />
                </div>
                
                <div className="modern-input-group">
                  <label className="modern-label">Nome de Usuário</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className="modern-input"
                    placeholder="@seuusername"
                  />
                </div>
              </div>
              
              
              <div className="modern-input-group">
                <label className="modern-label">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="modern-textarea"
                  placeholder="Conte um pouco sobre você..."
                  rows="4"
                />
              </div>
              
              
              <button onClick={handleSaveProfile} className="modern-save-btn">
                Salvar Alterações
              </button>
            </div>
          </div>
        );

      case "seguranca":
        return (
          <div className="tab-content">
            <div className="content-header">
              <h2 className="content-title">Segurança</h2>
              <p className="content-description">Mantenha sua conta segura</p>
            </div>
            
            <div className="modern-form-card">
              <div className="modern-input-group">
                <label className="modern-label">Senha Atual</label>
                <input
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                  className="modern-input"
                  placeholder="Digite sua senha atual"
                />
              </div>
              
              <div className="form-row">
                <div className="modern-input-group">
                  <label className="modern-label">Nova Senha</label>
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange("newPassword", e.target.value)}
                    className="modern-input"
                    placeholder="Digite sua nova senha"
                  />
                </div>
                
                <div className="modern-input-group">
                  <label className="modern-label">Confirmar Nova Senha</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="modern-input"
                    placeholder="Confirme sua nova senha"
                  />
                </div>
              </div>
              
              <button onClick={handleChangePassword} className="modern-save-btn">
                Alterar Senha
              </button>
            </div>
          </div>
        );

      case "conta":
        return (
          <div className="tab-content">
            <div className="content-header">
              <h2 className="content-title">Configurações da Conta</h2>
              <p className="content-description">Gerencie dados e configurações avançadas</p>
            </div>
            
            <div className="modern-form-card">
              <div className="action-list">
                <div className="modern-action-item">
                  <div className="action-content">
                    <h4 className="action-title">Exportar Dados</h4>
                    <p className="action-desc">Baixe uma cópia completa dos seus dados</p>
                  </div>
                  <button className="modern-action-btn secondary">Exportar</button>
                </div>
                
                <div className="modern-action-item">
                  <div className="action-content">
                    <h4 className="action-title">Desativar Conta</h4>
                    <p className="action-desc">Temporariamente desative sua conta</p>
                  </div>
                  <button className="modern-action-btn secondary">Desativar</button>
                </div>

                                <div className="modern-action-item">
  <div className="action-content">
    <h4 className="action-title">Sair da Conta</h4>
    <p className="action-desc">Desconecte-se da sua conta atual</p>
  </div>
  <button onClick={handleLogout} className="modern-action-btn logout">
    <LogOutIcon />
    Sair
  </button>
</div>
                
                <div className="modern-action-item danger">
                  <div className="action-content">
                    <h4 className="action-title">Excluir Conta</h4>
                    <p className="action-desc">Remova permanentemente sua conta</p>
                  </div>
                  <button className="modern-action-btn danger">Excluir</button>
                </div>


              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

const tabs = [
  { id: "pessoais", label: "Perfil", icon: <UserIcon /> },
  { id: "seguranca", label: "Segurança", icon: <ShieldIcon /> },
  { id: "conta", label: "Conta", icon: <SettingsIcon /> }
];


  return (
    <div className={`minha-conta-container ${tema === "escuro" ? "escuro-fundo-cinza" : "claro-fundo-bege"}`}>
      <Sidebar 
        tema={tema}
        toggleTema={toggleTema}
        onSearchModal={() => setShowSearchModal(true)}
        activeItem={'settings'}
        onNavigate={handleNavigation}
      />
      
      <main className="modern-main">
        <div className="modern-content">
          {/* Header do Perfil Moderno */}
          <div className="modern-profile-header">
            <div className="profile-hero">
              <div className="profile-avatar-section">
                <div className="modern-avatar-container">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="modern-avatar"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2QjdCQzQiIHN0cm9rZS13aWR0aD0iMiI+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ii8+PHBhdGggZD0iTTIwIDIxdi0yYTQgNCAwIDAgMC00LTRIOGE0IDQgMCAwIDAtNCA0djIiLz48L3N2Zz4=';
                    }}
                  />
                  <label className="modern-avatar-edit">
                    <CameraIcon />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      hidden
                    />
                  </label>
                </div>
              </div>
              
              <div className="profile-details">
                <h1 className="modern-profile-name">{userProfile.name}</h1>
                <p className="modern-profile-username">@{userProfile.username}</p>
                <p className="modern-profile-bio">{userProfile.bio}</p>
                
                <div className="profile-stats">
                  <div className="stat-item">
                    <CalendarIcon />
                    <span>Entrou em {userProfile.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Moderna */}
          <div className="modern-tabs-container">
            <nav className="modern-tab-nav">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`modern-tab-btn ${activeTab === tab.id ? "active" : ""}`}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-text">{tab.label}</span>
                </button>
              ))}
            </nav>
            
            <div className="modern-tab-content">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}