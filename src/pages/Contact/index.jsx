import "./contact.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEnvelope, 
    faPhone, 
    faMapMarkerAlt,
    faPaperPlane,
    faUser,
    faCommentDots,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

/**
 * Página de Contato.
 * Permite que usuários enviem mensagens e visualizem informações de contato.
 */
function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

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

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Nome é obrigatório';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'E-mail é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'E-mail inválido';
        }
        
        if (!formData.subject.trim()) {
            newErrors.subject = 'Assunto é obrigatório';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Mensagem é obrigatória';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Limpar erro do campo ao digitar
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        // Simular envio (será integrado com API futuramente)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Reset após 5 segundos
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const contactInfo = [
        {
            icon: faEnvelope,
            title: 'E-mail',
            value: 'contato@prevent.com.br',
            link: 'mailto:contato@prevent.com.br'
        },
        {
            icon: faPhone,
            title: 'Telefone',
            value: '(11) 99999-9999',
            link: 'tel:+5511999999999'
        },
        {
            icon: faMapMarkerAlt,
            title: 'Localização',
            value: 'São Paulo, Brasil',
            link: null
        }
    ];

    const subjects = [
        'Dúvida geral',
        'Reportar problema',
        'Sugestão de melhoria',
        'Parceria',
        'Imprensa',
        'Outro'
    ];

    return (
        <>
            <Header />
            <main className="contact-page">
                {/* Hero Section */}
                <section className="contact-hero">
                    <div className="contact-hero-content animate-on-scroll">
                        <span className="contact-badge">Fale Conosco</span>
                        <h1 className="contact-hero-title">Entre em Contato</h1>
                        <p className="contact-hero-subtitle">
                            Tem alguma dúvida, sugestão ou quer reportar um problema? 
                            Estamos aqui para ajudar.
                        </p>
                    </div>
                </section>

                {/* Contact Content */}
                <section className="contact-content">
                    <div className="contact-container">
                        <div className="contact-grid">
                            {/* Contact Info */}
                            <div className="contact-info animate-on-scroll">
                                <h2 className="contact-info-title">Informações de Contato</h2>
                                <p className="contact-info-description">
                                    Escolha a melhor forma de entrar em contato conosco. 
                                    Respondemos em até 24 horas úteis.
                                </p>
                                
                                <div className="contact-info-list">
                                    {contactInfo.map((item, index) => (
                                        <div key={index} className="contact-info-item">
                                            <div className="contact-info-icon">
                                                <FontAwesomeIcon icon={item.icon} />
                                            </div>
                                            <div className="contact-info-content">
                                                <span className="contact-info-label">{item.title}</span>
                                                {item.link ? (
                                                    <a href={item.link} className="contact-info-value">
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <span className="contact-info-value">{item.value}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="contact-hours">
                                    <h3 className="contact-hours-title">Horário de Atendimento</h3>
                                    <p className="contact-hours-text">
                                        Segunda a Sexta: 9h às 18h<br />
                                        Sábado: 9h às 13h
                                    </p>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="contact-form-wrapper animate-on-scroll">
                                {isSubmitted ? (
                                    <div className="contact-success">
                                        <div className="contact-success-icon">
                                            <FontAwesomeIcon icon={faCheckCircle} />
                                        </div>
                                        <h3 className="contact-success-title">Mensagem Enviada!</h3>
                                        <p className="contact-success-message">
                                            Obrigado por entrar em contato. Responderemos em breve.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="contact-form">
                                        <h2 className="contact-form-title">Envie sua Mensagem</h2>
                                        
                                        <div className="form-row">
                                            <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                                                <label htmlFor="name">
                                                    <FontAwesomeIcon icon={faUser} />
                                                    Nome Completo
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Seu nome"
                                                />
                                                {errors.name && <span className="form-error">{errors.name}</span>}
                                            </div>
                                            
                                            <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                                                <label htmlFor="email">
                                                    <FontAwesomeIcon icon={faEnvelope} />
                                                    E-mail
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="seu@email.com"
                                                />
                                                {errors.email && <span className="form-error">{errors.email}</span>}
                                            </div>
                                        </div>
                                        
                                        <div className={`form-group ${errors.subject ? 'has-error' : ''}`}>
                                            <label htmlFor="subject">
                                                <FontAwesomeIcon icon={faCommentDots} />
                                                Assunto
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                            >
                                                <option value="">Selecione um assunto</option>
                                                {subjects.map((subject, index) => (
                                                    <option key={index} value={subject}>{subject}</option>
                                                ))}
                                            </select>
                                            {errors.subject && <span className="form-error">{errors.subject}</span>}
                                        </div>
                                        
                                        <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
                                            <label htmlFor="message">
                                                <FontAwesomeIcon icon={faPaperPlane} />
                                                Mensagem
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Escreva sua mensagem aqui..."
                                                rows="5"
                                            ></textarea>
                                            {errors.message && <span className="form-error">{errors.message}</span>}
                                        </div>
                                        
                                        <button 
                                            type="submit" 
                                            className="contact-submit-btn"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="btn-spinner"></span>
                                                    Enviando...
                                                </>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon icon={faPaperPlane} />
                                                    Enviar Mensagem
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Contact;
