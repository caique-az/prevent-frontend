import "./main.css";
import Header from '../../components/Header';
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faFire, 
    faCloudRain, 
    faMountain, 
    faShieldAlt, 
    faMapMarkedAlt, 
    faBell,
    faSearch,
    faChartLine,
    faArrowRight,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

function Home() {
    const estados = [
        { 
            nome: "São Paulo", 
            sigla: "SP",
            bairros: 6, 
            areas: 3,
            flag: "/images/Bandeira_do_estado_de_São_Paulo.svg.png"
        },
        { 
            nome: "Rio de Janeiro", 
            sigla: "RJ",
            bairros: 6, 
            areas: 3,
            flag: "/images/Bandeira_do_estado_do_Rio_de_Janeiro.svg.png"
        },
        { 
            nome: "Minas Gerais", 
            sigla: "MG",
            bairros: 6, 
            areas: 3,
            flag: "/images/Bandeira_de_Minas_Gerais.svg.png"
        },
    ];

    const stats = [
        { number: "500+", label: "Áreas Monitoradas", icon: faMapMarkedAlt },
        { number: "18", label: "Bairros Mapeados", icon: faShieldAlt },
        { number: "3", label: "Estados Cobertos", icon: faChartLine },
        { number: "24/7", label: "Monitoramento", icon: faBell },
    ];

    const features = [
        {
            icon: faFire,
            color: "#e74c3c",
            bgColor: "linear-gradient(135deg, #ffeaea 0%, #ffd4d4 100%)",
            title: "Incêndios",
            description: "Acompanhe focos de incêndio em tempo real, receba alertas sobre áreas de risco e visualize mapas atualizados com dados de queimadas.",
        },
        {
            icon: faCloudRain,
            color: "#3498db",
            bgColor: "linear-gradient(135deg, #e8f4fd 0%, #cce5ff 100%)",
            title: "Enchentes",
            description: "Monitore o volume de chuvas, identifique regiões com risco de alagamento e receba notificações antecipadas para evacuação.",
        },
        {
            icon: faMountain,
            color: "#8b4513",
            bgColor: "linear-gradient(135deg, #f5ebe0 0%, #e6d5c3 100%)",
            title: "Deslizamentos",
            description: "Fique informado sobre áreas com solo instável e previsões de risco de deslizamentos baseadas em dados climáticos.",
        },
    ];

    const steps = [
        {
            number: "01",
            icon: faSearch,
            title: "Busque sua Região",
            description: "Digite o nome do estado ou bairro na barra de pesquisa para encontrar informações específicas.",
        },
        {
            number: "02",
            icon: faMapMarkedAlt,
            title: "Visualize o Mapa",
            description: "Explore o mapa interativo com áreas de risco destacadas e informações detalhadas de cada região.",
        },
        {
            number: "03",
            icon: faBell,
            title: "Receba Alertas",
            description: "Mantenha-se informado com dicas de prevenção e recomendações para cada tipo de risco.",
        },
    ];

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
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observerRef.current.observe(el));

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return (
        <>
            <Header />
            
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <div className="hero-badge animate-on-scroll">
                        <FontAwesomeIcon icon={faShieldAlt} />
                        <span>Sistema de Prevenção de Desastres</span>
                    </div>
                    <h1 className="hero-title animate-on-scroll">
                        Proteja sua comunidade contra
                        <span className="hero-highlight"> desastres naturais</span>
                    </h1>
                    <p className="hero-subtitle animate-on-scroll">
                        Monitore riscos ambientais em tempo real, receba alertas antecipados 
                        e acesse informações vitais para proteger você e sua família.
                    </p>
                    <div className="hero-buttons animate-on-scroll">
                        <Link to="/results/São Paulo" className="btn-hero-primary">
                            <span>Explorar Regiões</span>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                        <Link to="/projects" className="btn-hero-secondary">
                            Saiba Mais
                        </Link>
                    </div>
                </div>
                
                {/* Stats Bar */}
                <div className="stats-bar animate-on-scroll">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item">
                            <FontAwesomeIcon icon={stat.icon} className="stat-icon" />
                            <div className="stat-content">
                                <span className="stat-number">{stat.number}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <span className="section-badge">Monitoramento</span>
                        <h2 className="section-title">Tipos de Riscos Monitorados</h2>
                        <p className="section-subtitle">
                            Acompanhe diferentes tipos de desastres naturais e receba informações 
                            específicas para cada situação de risco.
                        </p>
                    </div>
                    
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div 
                                key={index} 
                                className="feature-card animate-on-scroll"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div 
                                    className="feature-icon-wrapper"
                                    style={{ background: feature.bgColor }}
                                >
                                    <FontAwesomeIcon 
                                        icon={feature.icon} 
                                        style={{ color: feature.color }}
                                        className="feature-icon"
                                    />
                                </div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                                <Link to="/results/São Paulo" className="feature-link">
                                    Ver no mapa
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works Section */}
            <section className="how-it-works-section">
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <span className="section-badge">Como Funciona</span>
                        <h2 className="section-title">Simples e Eficiente</h2>
                        <p className="section-subtitle">
                            Em apenas três passos, você tem acesso a todas as informações 
                            necessárias para se proteger.
                        </p>
                    </div>
                    
                    <div className="steps-grid">
                        {steps.map((step, index) => (
                            <div 
                                key={index} 
                                className="step-card animate-on-scroll"
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className="step-number">{step.number}</div>
                                <div className="step-icon-wrapper">
                                    <FontAwesomeIcon icon={step.icon} className="step-icon" />
                                </div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-description">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Estados Section */}
            <section className="estados-section">
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <span className="section-badge">Cobertura</span>
                        <h2 className="section-title">Regiões Monitoradas</h2>
                        <p className="section-subtitle">
                            Selecione um estado para visualizar informações detalhadas sobre 
                            áreas de risco e bairros monitorados.
                        </p>
                    </div>
                    
                    <div className="estados-grid">
                        {estados.map((estado, index) => (
                            <Link 
                                key={index} 
                                to={`/results/${estado.nome}`}
                                className="estado-card animate-on-scroll"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="estado-flag-wrapper">
                                    <div 
                                        className="estado-flag"
                                        style={{ backgroundImage: `url(${estado.flag})` }}
                                    ></div>
                                </div>
                                <div className="estado-info">
                                    <h3 className="estado-nome">{estado.nome}</h3>
                                    <span className="estado-sigla">{estado.sigla}</span>
                                </div>
                                <div className="estado-stats">
                                    <div className="estado-stat">
                                        <span className="estado-stat-number">{estado.bairros}</span>
                                        <span className="estado-stat-label">Bairros</span>
                                    </div>
                                    <div className="estado-stat">
                                        <span className="estado-stat-number">{estado.areas}</span>
                                        <span className="estado-stat-label">Áreas de Risco</span>
                                    </div>
                                </div>
                                <div className="estado-cta">
                                    <span>Acessar</span>
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-content animate-on-scroll">
                            <span className="section-badge">Sobre Nós</span>
                            <h2 className="about-title">Conheça o Projeto Prevent</h2>
                            <p className="about-description">
                                O Prevent nasceu da necessidade de proteger comunidades contra 
                                desastres naturais. Desenvolvido por uma equipe dedicada, nosso 
                                sistema utiliza tecnologias modernas para monitorar riscos 
                                ambientais e fornecer informações vitais em tempo real.
                            </p>
                            <ul className="about-features">
                                <li>
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                    <span>Monitoramento em tempo real</span>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                    <span>Mapas interativos detalhados</span>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                    <span>Dicas de prevenção personalizadas</span>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                    <span>Interface intuitiva e acessível</span>
                                </li>
                            </ul>
                            <Link to="/projects" className="btn-about">
                                <span>Conheça a Equipe</span>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </Link>
                        </div>
                        <div className="about-image animate-on-scroll">
                            <div className="about-image-wrapper">
                                <div className="about-image-bg"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Home;