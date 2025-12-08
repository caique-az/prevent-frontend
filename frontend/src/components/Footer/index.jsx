import "./footer.css"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTornado, 
    faEnvelope, 
    faPhone, 
    faMapMarkerAlt,
    faArrowRight,
    faHeart
} from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"

function Footer() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
            // Aqui será integrado com a API futuramente
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    const currentYear = new Date().getFullYear();

    const navigation = [
        { name: 'Home', path: '/' },
        { name: 'São Paulo', path: '/results/São Paulo' },
        { name: 'Rio de Janeiro', path: '/results/Rio de Janeiro' },
        { name: 'Minas Gerais', path: '/results/Minas Gerais' },
    ];

    const resources = [
        { name: 'Sobre o Projeto', path: '/projects' },
        { name: 'Configurações', path: '/configurations' },
        { name: 'Como Funciona', path: '/#how-it-works' },
        { name: 'Contato', path: '/#contact' },
    ];

    return (
        <footer className="footer">
            {/* Main Footer Content */}
            <div className="footer-main">
                <div className="footer-container">
                    <div className="footer-grid">
                        {/* Brand Column */}
                        <div className="footer-brand">
                            <Link to="/" className="footer-logo">
                                <FontAwesomeIcon icon={faTornado} className="footer-logo-icon" />
                                <span>Prevent</span>
                            </Link>
                            <p className="footer-description">
                                Sistema de prevenção e monitoramento de desastres naturais. 
                                Protegendo comunidades com informações em tempo real.
                            </p>
                            <div className="footer-contact">
                                <div className="footer-contact-item">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <span>contato@prevent.com.br</span>
                                </div>
                                <div className="footer-contact-item">
                                    <FontAwesomeIcon icon={faPhone} />
                                    <span>(11) 99999-9999</span>
                                </div>
                                <div className="footer-contact-item">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                    <span>São Paulo, Brasil</span>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Column */}
                        <div className="footer-nav-column">
                            <h4 className="footer-nav-title">Navegação</h4>
                            <ul className="footer-nav-list">
                                {navigation.map((item, index) => (
                                    <li key={index}>
                                        <Link to={item.path}>{item.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources Column */}
                        <div className="footer-nav-column">
                            <h4 className="footer-nav-title">Recursos</h4>
                            <ul className="footer-nav-list">
                                {resources.map((item, index) => (
                                    <li key={index}>
                                        <Link to={item.path}>{item.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter Column */}
                        <div className="footer-newsletter">
                            <h4 className="footer-nav-title">Newsletter</h4>
                            <p className="footer-newsletter-text">
                                Receba alertas e atualizações sobre riscos ambientais na sua região.
                            </p>
                            <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
                                <div className="footer-input-wrapper">
                                    <input
                                        type="email"
                                        placeholder="Seu melhor e-mail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="footer-newsletter-input"
                                        required
                                    />
                                    <button type="submit" className="footer-newsletter-btn">
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </button>
                                </div>
                                {subscribed && (
                                    <p className="footer-newsletter-success">
                                        Inscrito com sucesso!
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="footer-container">
                    <div className="footer-bottom-content">
                        <p className="footer-copyright">
                            &copy; {currentYear} Prevent. Todos os direitos reservados.
                        </p>
                        <p className="footer-made-with">
                            Feito com <FontAwesomeIcon icon={faHeart} className="footer-heart" /> para proteger vidas.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer