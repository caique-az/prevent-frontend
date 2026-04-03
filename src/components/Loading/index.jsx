import "./loading.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTornado } from '@fortawesome/free-solid-svg-icons';

/**
 * Componente de Loading reutilizável.
 * Exibe um spinner animado com mensagem opcional.
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} [props.message="Carregando..."] - Mensagem exibida abaixo do spinner
 * @param {boolean} [props.fullScreen=false] - Se true, ocupa a tela inteira
 * @param {string} [props.size="medium"] - Tamanho do spinner: "small", "medium", "large"
 */
function Loading({ message = "Carregando...", fullScreen = false, size = "medium" }) {
    return (
        <div className={`loading-container ${fullScreen ? 'loading-fullscreen' : ''} loading-${size}`}>
            <div className="loading-spinner">
                <FontAwesomeIcon icon={faTornado} className="loading-icon" />
            </div>
            {message && <p className="loading-message">{message}</p>}
        </div>
    );
}

export default Loading;
