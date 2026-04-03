import { Component } from 'react';
import "./error-boundary.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faHome, faRedo } from '@fortawesome/free-solid-svg-icons';

/**
 * Error Boundary para capturar erros em componentes filhos.
 * Exibe uma UI de fallback quando ocorre um erro.
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        
        // Log do erro para debugging
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <div className="error-boundary-content">
                        <div className="error-icon-wrapper">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" />
                        </div>
                        <h1 className="error-title">Ops! Algo deu errado</h1>
                        <p className="error-message">
                            Ocorreu um erro inesperado. Nossa equipe foi notificada e está trabalhando para resolver.
                        </p>
                        
                        {this.props.showDetails && this.state.error && (
                            <details className="error-details">
                                <summary>Detalhes técnicos</summary>
                                <pre>{this.state.error.toString()}</pre>
                                {this.state.errorInfo && (
                                    <pre>{this.state.errorInfo.componentStack}</pre>
                                )}
                            </details>
                        )}
                        
                        <div className="error-actions">
                            <button onClick={this.handleReload} className="error-btn error-btn-primary">
                                <FontAwesomeIcon icon={faRedo} />
                                <span>Tentar Novamente</span>
                            </button>
                            <button onClick={this.handleGoHome} className="error-btn error-btn-secondary">
                                <FontAwesomeIcon icon={faHome} />
                                <span>Voltar ao Início</span>
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
