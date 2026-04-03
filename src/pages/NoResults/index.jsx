import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './main.css';

function NoResults() {
    return (
        <>
            <Header />
            <main style={{ flex: 1 }}>
                <div className="no-results container text-center mt-5 mb-5">
                    <h1 className="display-5 mb-3">Nenhum resultado encontrado</h1>
                    <p className="lead mb-4">
                        Não encontramos nenhum estado, cidade ou bairro que corresponda à sua pesquisa.
                    </p>
                    <a href="/" className="btn btn-primary">Voltar para a página inicial</a>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default NoResults;
