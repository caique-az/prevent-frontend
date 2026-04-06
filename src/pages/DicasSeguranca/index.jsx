import { useEffect, useRef } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faShieldAlt,
    faFirstAid,
    faPhoneAlt,
    faFireExtinguisher,
    faTruckMedical,
    faExclamationTriangle,
    faCheckCircle,
    faLightbulb,
    faHandsHelping
} from '@fortawesome/free-solid-svg-icons';
import './main.css';

function DicasSeguranca() {
    const categorias = [
        {
            titulo: 'Antes da Emergência',
            icon: faLightbulb,
            color: '#f59e0b',
            bgColor: '#fef3c7',
            dicas: [
                'Tenha um kit de emergência com água, alimentos não perecíveis, remédios e documentos importantes.',
                'Conheça os sinais de alerta da sua região e os canais de comunicação oficiais.',
                'Defina um ponto de encontro seguro para sua família em caso de separação.',
                'Mantenha uma lista de contatos de emergência em local visível.',
                'Conheça as rotas de evacuação do seu bairro.',
                'Mantenha documentos importantes em saco plástico à prova d\'água.'
            ]
        },
        {
            titulo: 'Durante a Emergência',
            icon: faExclamationTriangle,
            color: '#e74c3c',
            bgColor: '#fee2e2',
            dicas: [
                'Mantenha a calma e siga as instruções das autoridades locais.',
                'Desligue a energia elétrica e o gás antes de sair de casa, se possível.',
                'Evite áreas alagadas, mesmo que pareçam rasas.',
                'Use calçados resistentes para se proteger de objetos cortantes.',
                'Não tente atravessar ruas com enxurrada forte.',
                'Não retorne para buscar pertences em áreas de risco.'
            ]
        },
        {
            titulo: 'Após a Emergência',
            icon: faHandsHelping,
            color: '#10b981',
            bgColor: '#d1fae5',
            dicas: [
                'Retorne para casa apenas quando as autoridades liberarem.',
                'Cuidado com fios elétricos soltos e estruturas danificadas.',
                'Ferva a água antes de consumir até confirmação de segurança.',
                'Ajude vizinhos idosos ou com mobilidade reduzida, se possível.',
                'Registre danos com fotos para seguros e assistência.',
                'Procure atendimento médico se necessário, mesmo sem sintomas visíveis.'
            ]
        }
    ];

    const emergencias = [
        { nome: 'SAMU', numero: '192', icon: faTruckMedical, color: '#e74c3c' },
        { nome: 'Defesa Civil', numero: '199', icon: faShieldAlt, color: '#0c6681' },
        { nome: 'Bombeiros', numero: '193', icon: faFireExtinguisher, color: '#f59e0b' },
        { nome: 'Polícia Militar', numero: '190', icon: faExclamationTriangle, color: '#3b82f6' },
    ];

    const kitEmergencia = [
        'Água potável (2L por pessoa/dia)',
        'Alimentos não perecíveis',
        'Lanterna e pilhas extras',
        'Kit de primeiros socorros',
        'Rádio portátil',
        'Cópias de documentos em saco plástico',
        'Medicamentos de uso contínuo',
        'Dinheiro em espécie',
        'Apito para sinalização',
        'Cobertor térmico',
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
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    return (
        <>
            <Header />
            <main className="dicas-page">
                {/* Hero */}
                <section className="dicas-hero">
                    <div className="dicas-hero-content animate-on-scroll">
                        <span className="dicas-badge">
                            <FontAwesomeIcon icon={faFirstAid} />
                            Prevenção
                        </span>
                        <h1 className="dicas-hero-title">Dicas de Segurança</h1>
                        <p className="dicas-hero-subtitle">
                            Orientações essenciais para antes, durante e após emergências.
                            Preparação salva vidas.
                        </p>
                    </div>
                </section>

                {/* Categorias de Dicas */}
                <section className="dicas-categorias-section">
                    <div className="dicas-container">
                        <div className="dicas-categorias-grid">
                            {categorias.map((cat, index) => (
                                <div
                                    key={index}
                                    className="dicas-categoria-card animate-on-scroll"
                                    style={{ animationDelay: `${index * 0.15}s` }}
                                >
                                    <div className="dicas-categoria-header">
                                        <div
                                            className="dicas-categoria-icon"
                                            style={{ backgroundColor: cat.bgColor, color: cat.color }}
                                        >
                                            <FontAwesomeIcon icon={cat.icon} />
                                        </div>
                                        <h2 className="dicas-categoria-titulo">{cat.titulo}</h2>
                                    </div>
                                    <ul className="dicas-lista">
                                        {cat.dicas.map((dica, i) => (
                                            <li key={i} className="dicas-item">
                                                <FontAwesomeIcon
                                                    icon={faCheckCircle}
                                                    className="dicas-check"
                                                    style={{ color: cat.color }}
                                                />
                                                <span>{dica}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Kit de Emergência */}
                <section className="dicas-kit-section">
                    <div className="dicas-container">
                        <div className="dicas-kit-wrapper animate-on-scroll">
                            <div className="dicas-kit-header">
                                <span className="section-badge">Preparação</span>
                                <h2 className="section-title">Kit de Emergência</h2>
                                <p className="section-subtitle">
                                    Itens essenciais que toda família deve ter preparado.
                                </p>
                            </div>
                            <div className="dicas-kit-grid">
                                {kitEmergencia.map((item, index) => (
                                    <div key={index} className="dicas-kit-item">
                                        <span className="dicas-kit-number">{String(index + 1).padStart(2, '0')}</span>
                                        <span className="dicas-kit-text">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Números de Emergência */}
                <section className="dicas-emergencia-section">
                    <div className="dicas-container">
                        <div className="section-header animate-on-scroll">
                            <span className="section-badge-danger">Emergência</span>
                            <h2 className="section-title">Números de Emergência</h2>
                            <p className="section-subtitle">
                                Salve estes números no seu celular. Em caso de emergência, ligue imediatamente.
                            </p>
                        </div>

                        <div className="dicas-emergencia-grid">
                            {emergencias.map((em, index) => (
                                <div
                                    key={index}
                                    className="dicas-emergencia-card animate-on-scroll"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div
                                        className="dicas-emergencia-icon-wrapper"
                                        style={{ backgroundColor: `${em.color}15`, color: em.color }}
                                    >
                                        <FontAwesomeIcon icon={em.icon} />
                                    </div>
                                    <h3 className="dicas-emergencia-nome">{em.nome}</h3>
                                    <p className="dicas-emergencia-numero" style={{ color: em.color }}>
                                        {em.numero}
                                    </p>
                                    <a
                                        href={`tel:${em.numero}`}
                                        className="dicas-emergencia-btn"
                                        style={{ borderColor: em.color, color: em.color }}
                                    >
                                        <FontAwesomeIcon icon={faPhoneAlt} />
                                        Ligar
                                    </a>
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

export default DicasSeguranca;