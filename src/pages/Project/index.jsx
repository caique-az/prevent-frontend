import "./main.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUsers,
    faLightbulb, 
    faShieldAlt,
    faCode,
    faHeart,
    faRocket,
    faGlobe,
    faHandshake,
    faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin as faLinkedinBrand, faGithub as faGithubBrand } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useRef } from "react";

function Project() {
    const teamMembers = [
        { 
            name: "Caique Camargo Azevedo", 
            role: "Desenvolvedor Front-end",
            description: "Especialista em React e interfaces modernas.",
            linkedin: "#",
            github: "#"
        },
        { 
            name: "Lucas Rafael Bueno de Arantes", 
            role: "Desenvolvedor Full-Stack",
            description: "Experiência em Python, FastAPI e React.",
            linkedin: "#",
            github: "#"
        },
        { 
            name: "Viviane Aparecida Reis", 
            role: "Desenvolvedora Full-Stack",
            description: "Foco em arquitetura de sistemas e UX.",
            linkedin: "#",
            github: "#"
        },
    ];

    const values = [
        {
            icon: faShieldAlt,
            title: "Segurança",
            description: "Priorizamos a segurança das comunidades em risco, fornecendo informações precisas e confiáveis.",
            color: "#0c6681"
        },
        {
            icon: faLightbulb,
            title: "Inovação",
            description: "Utilizamos tecnologia de ponta para criar soluções eficazes e acessíveis a todos.",
            color: "#f59e0b"
        },
        {
            icon: faHeart,
            title: "Empatia",
            description: "Desenvolvemos com foco nas pessoas, entendendo suas necessidades e preocupações.",
            color: "#ef4444"
        },
        {
            icon: faHandshake,
            title: "Colaboração",
            description: "Trabalhamos em parceria com comunidades e órgãos públicos para maximizar o impacto.",
            color: "#10b981"
        },
    ];

    const technologies = [
        { name: "React", category: "Frontend" },
        { name: "Vite", category: "Build" },
        { name: "Leaflet", category: "Mapas" },
        { name: "Spring Boot", category: "Backend" },
        { name: "PostgreSQL", category: "Database" },
        { name: "Chart.js", category: "Gráficos" },
    ];

    const stats = [
        { number: "3", label: "Estados Cobertos" },
        { number: "18", label: "Bairros Mapeados" },
        { number: "500+", label: "Áreas Monitoradas" },
        { number: "24/7", label: "Disponibilidade" },
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
            <main className="project-page">
                {/* Hero Section */}
                <section className="project-hero">
                    <div className="project-hero-content animate-on-scroll">
                        <span className="project-badge">Sobre o Projeto</span>
                        <h1 className="project-hero-title">Conheça o Prevent</h1>
                        <p className="project-hero-subtitle">
                            Um sistema desenvolvido para proteger comunidades contra desastres naturais, 
                            fornecendo informações em tempo real e ajudando na prevenção.
                        </p>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="project-stats">
                    <div className="project-container">
                        <div className="stats-grid animate-on-scroll">
                            {stats.map((stat, index) => (
                                <div key={index} className="stat-card">
                                    <span className="stat-number">{stat.number}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="project-mission">
                    <div className="project-container">
                        <div className="mission-grid">
                            <div className="mission-content animate-on-scroll">
                                <span className="section-badge">Nossa Missão</span>
                                <h2 className="section-title">Proteger Vidas Através da Informação</h2>
                                <p className="mission-text">
                                    O Prevent nasceu da necessidade de fornecer informações acessíveis e em tempo real 
                                    sobre riscos ambientais. Nossa missão é empoderar comunidades com conhecimento, 
                                    permitindo que tomem decisões informadas para proteger suas famílias.
                                </p>
                                <p className="mission-text">
                                    Acreditamos que a prevenção é a melhor forma de combater desastres naturais. 
                                    Por isso, desenvolvemos uma plataforma que integra dados de múltiplas fontes, 
                                    apresentando-os de forma clara e acionável.
                                </p>
                                <div className="mission-features">
                                    <div className="mission-feature">
                                        <FontAwesomeIcon icon={faGlobe} />
                                        <span>Cobertura Nacional</span>
                                    </div>
                                    <div className="mission-feature">
                                        <FontAwesomeIcon icon={faChartLine} />
                                        <span>Dados em Tempo Real</span>
                                    </div>
                                    <div className="mission-feature">
                                        <FontAwesomeIcon icon={faRocket} />
                                        <span>Tecnologia Moderna</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mission-image animate-on-scroll">
                                <div className="mission-image-wrapper">
                                    <div className="mission-image-bg"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="project-values">
                    <div className="project-container">
                        <div className="section-header animate-on-scroll">
                            <span className="section-badge">Nossos Valores</span>
                            <h2 className="section-title">O Que Nos Guia</h2>
                            <p className="section-subtitle">
                                Princípios fundamentais que orientam cada decisão e linha de código.
                            </p>
                        </div>
                        <div className="values-grid">
                            {values.map((value, index) => (
                                <div 
                                    key={index} 
                                    className="value-card animate-on-scroll"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div 
                                        className="value-icon-wrapper"
                                        style={{ backgroundColor: `${value.color}15` }}
                                    >
                                        <FontAwesomeIcon 
                                            icon={value.icon} 
                                            style={{ color: value.color }}
                                        />
                                    </div>
                                    <h3 className="value-title">{value.title}</h3>
                                    <p className="value-description">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="project-team">
                    <div className="project-container">
                        <div className="section-header animate-on-scroll">
                            <span className="section-badge">Nossa Equipe</span>
                            <h2 className="section-title">Quem Faz Acontecer</h2>
                            <p className="section-subtitle">
                                Desenvolvedores dedicados a criar soluções que fazem a diferença.
                            </p>
                        </div>
                        <div className="team-grid">
                            {teamMembers.map((member, index) => (
                                <div 
                                    key={index} 
                                    className="team-card animate-on-scroll"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="team-avatar">
                                        <FontAwesomeIcon icon={faUsers} />
                                    </div>
                                    <h3 className="team-name">{member.name}</h3>
                                    <span className="team-role">{member.role}</span>
                                    <p className="team-description">{member.description}</p>
                                    <div className="team-social">
                                        <a href={member.linkedin} className="team-social-link" aria-label="LinkedIn">
                                            <FontAwesomeIcon icon={faLinkedinBrand} />
                                        </a>
                                        <a href={member.github} className="team-social-link" aria-label="GitHub">
                                            <FontAwesomeIcon icon={faGithubBrand} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Technologies Section */}
                <section className="project-tech">
                    <div className="project-container">
                        <div className="section-header animate-on-scroll">
                            <span className="section-badge">Tecnologias</span>
                            <h2 className="section-title">Stack Tecnológica</h2>
                            <p className="section-subtitle">
                                Ferramentas modernas para uma solução robusta e escalável.
                            </p>
                        </div>
                        <div className="tech-grid animate-on-scroll">
                            {technologies.map((tech, index) => (
                                <div key={index} className="tech-card">
                                    <FontAwesomeIcon icon={faCode} className="tech-icon" />
                                    <span className="tech-name">{tech.name}</span>
                                    <span className="tech-category">{tech.category}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Project;