import "./main.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faLightbulb, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

function Project() {
    const teamMembers = [
        { name: "Caique Camargo Azevedo", role: "Desenvolvedor Front-end" },
        { name: "Lucas Rafael Bueno de Arantes", role: "Desenvolvedor Full-Stack" },
        { name: "Viviane Aparecida Reis", role: "Desenvolvedora Full-Stack" },
        { name: "Gabriel Furtado de Souza Carvalho", role: "Desenvolvedor Full-Stack" }
    ];

    return (
        <div className="project-page">
            <Header />
            <div className="hero-section">
                <div className="container">
                    <h1>Sobre Nós</h1>
                </div>
            </div>


            <div className="container mt-5">
                <section className="mb-5">
                    <h2>Nossa Missão</h2>
                    <div className="mission-statement">
                        <FontAwesomeIcon icon={faLightbulb} className="mission-icon" />
                        <p>
                            Nosso objetivo é fornecer informações em tempo real sobre desastres naturais,
                            ajudando comunidades a se prepararem e responderem de forma eficaz a situações de emergência.
                        </p>
                    </div>
                </section>


                <section className="mb-5">
                    <h2>Nossa Equipe</h2>
                    <div className="team-grid">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="team-card">
                                <div className="team-avatar">
                                    <FontAwesomeIcon icon={faUsers} />
                                </div>
                                <h3>{member.name}</h3>
                                <p className="role">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </section>


                <section className="mb-5">
                    <h2>Nossos Valores</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <FontAwesomeIcon icon={faShieldAlt} className="value-icon" />
                            <h3>Segurança</h3>
                            <p>Priorizamos a segurança das comunidades em risco.</p>
                        </div>
                        <div className="value-card">
                            <FontAwesomeIcon icon={faLightbulb} className="value-icon" />
                            <h3>Inovação</h3>
                            <p>Utilizamos tecnologia de ponta para soluções eficazes.</p>
                        </div>
                        <div className="value-card">
                            <FontAwesomeIcon icon={faUsers} className="value-icon" />
                            <h3>Comunidade</h3>
                            <p>Trabalhamos para o bem-estar de todas as comunidades.</p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default Project;