import { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser, 
    faBell, 
    faCog, 
    faFire, 
    faCloudRain, 
    faMountain,
    faSave,
    faCheckCircle,
    faMoon,
    faSun,
    faDesktop,
    faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import './main.css';

function Configurations() {
    const [activeTab, setActiveTab] = useState('perfil');
    const [saved, setSaved] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        notificacoes: true,
        emailNotifications: true,
        pushNotifications: false,
        tema: 'claro',
        regiao: 'sudeste',
        alertas: {
            incendio: true,
            alagamento: true,
            deslizamento: true
        }
    });

    // Carregar dados do localStorage
    useEffect(() => {
        const savedData = localStorage.getItem('preventConfig');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    // Animação ao scroll
    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observerRef.current.observe(el));

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAlertChange = (alertType) => {
        setFormData(prev => ({
            ...prev,
            alertas: {
                ...prev.alertas,
                [alertType]: !prev.alertas[alertType]
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('preventConfig', JSON.stringify(formData));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const tabs = [
        { id: 'perfil', label: 'Perfil', icon: faUser },
        { id: 'notificacoes', label: 'Notificações', icon: faBell },
        { id: 'preferencias', label: 'Preferências', icon: faCog },
    ];

    const alertTypes = [
        { 
            id: 'incendio', 
            label: 'Incêndios Florestais', 
            icon: faFire, 
            color: '#e74c3c',
            description: 'Receba alertas sobre focos de incêndio na sua região.'
        },
        { 
            id: 'alagamento', 
            label: 'Alagamentos', 
            icon: faCloudRain, 
            color: '#3498db',
            description: 'Seja notificado sobre riscos de enchentes e alagamentos.'
        },
        { 
            id: 'deslizamento', 
            label: 'Deslizamentos', 
            icon: faMountain, 
            color: '#8b4513',
            description: 'Alertas sobre áreas com risco de deslizamento de terra.'
        },
    ];

    const themes = [
        { id: 'claro', label: 'Claro', icon: faSun },
        { id: 'escuro', label: 'Escuro', icon: faMoon },
        { id: 'sistema', label: 'Sistema', icon: faDesktop },
    ];

    const regions = [
        { id: 'sul', label: 'Sul' },
        { id: 'sudeste', label: 'Sudeste' },
        { id: 'centro-oeste', label: 'Centro-Oeste' },
        { id: 'nordeste', label: 'Nordeste' },
        { id: 'norte', label: 'Norte' },
    ];

    return (
        <>
            <Header />
            <main className="config-page">
                {/* Hero Section */}
                <section className="config-hero">
                    <div className="config-hero-content animate-on-scroll">
                        <span className="config-badge">Personalização</span>
                        <h1 className="config-hero-title">Configurações</h1>
                        <p className="config-hero-subtitle">
                            Personalize sua experiência no Prevent e configure suas preferências de alertas.
                        </p>
                    </div>
                </section>

                {/* Config Content */}
                <section className="config-content">
                    <div className="config-container">
                        <div className="config-layout">
                            {/* Sidebar */}
                            <aside className="config-sidebar animate-on-scroll">
                                <nav className="config-nav">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            className={`config-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                                            onClick={() => setActiveTab(tab.id)}
                                        >
                                            <FontAwesomeIcon icon={tab.icon} />
                                            <span>{tab.label}</span>
                                        </button>
                                    ))}
                                </nav>
                            </aside>

                            {/* Main Content */}
                            <div className="config-main animate-on-scroll">
                                <form onSubmit={handleSubmit}>
                                    {/* Perfil Tab */}
                                    {activeTab === 'perfil' && (
                                        <div className="config-section">
                                            <div className="config-section-header">
                                                <h2 className="config-section-title">Informações do Perfil</h2>
                                                <p className="config-section-description">
                                                    Atualize suas informações pessoais.
                                                </p>
                                            </div>

                                            <div className="config-form-grid">
                                                <div className="config-form-group">
                                                    <label htmlFor="nome">Nome Completo</label>
                                                    <input
                                                        type="text"
                                                        id="nome"
                                                        name="nome"
                                                        value={formData.nome}
                                                        onChange={handleChange}
                                                        placeholder="Seu nome"
                                                    />
                                                </div>

                                                <div className="config-form-group">
                                                    <label htmlFor="email">E-mail</label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="seu@email.com"
                                                    />
                                                </div>

                                                <div className="config-form-group full-width">
                                                    <label htmlFor="telefone">Telefone</label>
                                                    <input
                                                        type="tel"
                                                        id="telefone"
                                                        name="telefone"
                                                        value={formData.telefone}
                                                        onChange={handleChange}
                                                        placeholder="(11) 99999-9999"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Notificações Tab */}
                                    {activeTab === 'notificacoes' && (
                                        <div className="config-section">
                                            <div className="config-section-header">
                                                <h2 className="config-section-title">Preferências de Notificação</h2>
                                                <p className="config-section-description">
                                                    Escolha como deseja receber alertas e atualizações.
                                                </p>
                                            </div>

                                            {/* Toggle Switches */}
                                            <div className="config-toggles">
                                                <div className="config-toggle-item">
                                                    <div className="config-toggle-info">
                                                        <span className="config-toggle-label">Notificações por E-mail</span>
                                                        <span className="config-toggle-description">
                                                            Receba alertas importantes no seu e-mail.
                                                        </span>
                                                    </div>
                                                    <label className="config-switch">
                                                        <input
                                                            type="checkbox"
                                                            name="emailNotifications"
                                                            checked={formData.emailNotifications}
                                                            onChange={handleChange}
                                                        />
                                                        <span className="config-switch-slider"></span>
                                                    </label>
                                                </div>

                                                <div className="config-toggle-item">
                                                    <div className="config-toggle-info">
                                                        <span className="config-toggle-label">Notificações Push</span>
                                                        <span className="config-toggle-description">
                                                            Receba alertas em tempo real no navegador.
                                                        </span>
                                                    </div>
                                                    <label className="config-switch">
                                                        <input
                                                            type="checkbox"
                                                            name="pushNotifications"
                                                            checked={formData.pushNotifications}
                                                            onChange={handleChange}
                                                        />
                                                        <span className="config-switch-slider"></span>
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Alert Types */}
                                            <div className="config-alerts-section">
                                                <h3 className="config-subsection-title">Tipos de Alertas</h3>
                                                <div className="config-alerts-grid">
                                                    {alertTypes.map((alert) => (
                                                        <div 
                                                            key={alert.id}
                                                            className={`config-alert-card ${formData.alertas[alert.id] ? 'active' : ''}`}
                                                            onClick={() => handleAlertChange(alert.id)}
                                                        >
                                                            <div 
                                                                className="config-alert-icon"
                                                                style={{ 
                                                                    backgroundColor: `${alert.color}15`,
                                                                    color: alert.color 
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={alert.icon} />
                                                            </div>
                                                            <div className="config-alert-content">
                                                                <span className="config-alert-label">{alert.label}</span>
                                                                <span className="config-alert-description">{alert.description}</span>
                                                            </div>
                                                            <div className="config-alert-check">
                                                                {formData.alertas[alert.id] && (
                                                                    <FontAwesomeIcon icon={faCheckCircle} />
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Preferências Tab */}
                                    {activeTab === 'preferencias' && (
                                        <div className="config-section">
                                            <div className="config-section-header">
                                                <h2 className="config-section-title">Preferências do Sistema</h2>
                                                <p className="config-section-description">
                                                    Personalize a aparência e comportamento do sistema.
                                                </p>
                                            </div>

                                            {/* Theme Selection */}
                                            <div className="config-preference-group">
                                                <h3 className="config-subsection-title">Tema</h3>
                                                <div className="config-theme-grid">
                                                    {themes.map((theme) => (
                                                        <label 
                                                            key={theme.id}
                                                            className={`config-theme-option ${formData.tema === theme.id ? 'active' : ''}`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="tema"
                                                                value={theme.id}
                                                                checked={formData.tema === theme.id}
                                                                onChange={handleChange}
                                                            />
                                                            <FontAwesomeIcon icon={theme.icon} />
                                                            <span>{theme.label}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Region Selection */}
                                            <div className="config-preference-group">
                                                <h3 className="config-subsection-title">
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                                    Região de Monitoramento
                                                </h3>
                                                <div className="config-region-grid">
                                                    {regions.map((region) => (
                                                        <label 
                                                            key={region.id}
                                                            className={`config-region-option ${formData.regiao === region.id ? 'active' : ''}`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="regiao"
                                                                value={region.id}
                                                                checked={formData.regiao === region.id}
                                                                onChange={handleChange}
                                                            />
                                                            <span>{region.label}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Save Button */}
                                    <div className="config-actions">
                                        <button type="submit" className="config-save-btn">
                                            {saved ? (
                                                <>
                                                    <FontAwesomeIcon icon={faCheckCircle} />
                                                    Salvo com Sucesso!
                                                </>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon icon={faSave} />
                                                    Salvar Alterações
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Configurations;