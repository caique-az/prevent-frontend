import "./not-found.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

/**
 * Página 404 - Exibida quando uma rota não é encontrada.
 */
function NotFound() {
    return (
        <>
            <Header />
            <main className="not-found-page">
                <div className="not-found-content">
                    <div className="not-found-code">404</div>
                    <h1 className="not-found-title">Página não encontrada</h1>
                    <p className="not-found-message">
                        A página que você está procurando não existe ou foi movida. 
                        Verifique o endereço ou navegue para uma das opções abaixo.
                    </p>
                    
                    <div className="not-found-actions">
                        <Link to="/" className="not-found-btn not-found-btn-primary">
                            <FontAwesomeIcon icon={faHome} />
                            <span>Voltar ao Início</span>
                        </Link>
                        <Link to="/results/São Paulo" className="not-found-btn not-found-btn-secondary">
                            <FontAwesomeIcon icon={faMapMarkedAlt} />
                            <span>Ver Mapa</span>
                        </Link>
                    </div>
                    
                    <div className="not-found-suggestions">
                        <p className="not-found-suggestions-title">Páginas populares:</p>
                        <div className="not-found-links">
                            <Link to="/results/São Paulo">São Paulo</Link>
                            <Link to="/results/Rio de Janeiro">Rio de Janeiro</Link>
                            <Link to="/results/Minas Gerais">Minas Gerais</Link>
                            <Link to="/projects">Sobre o Projeto</Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default NotFound;
