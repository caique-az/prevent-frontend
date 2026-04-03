import React from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Header from '../../components/Header';
import Footer from "../../components/Footer";
import "./main.css";

function Historico() {
    const { estado } = useParams(); // Captura o estado da URL

    // Dados das cidades e alertas
    const dados = {
        "São Paulo": [
            { nome: "Maua", localizacao: "São Paulo", data: "2025-05-01", alerta: "Enchente" },
            { nome: "Santo André", localizacao: "São Paulo", data: "2025-04-10", alerta: "Deslizamento" },
            { nome: "São Bernardo", localizacao: "São Paulo", data: "2025-03-05", alerta: "Incendio" },
        ],
        "Rio de Janeiro": [
            { nome: "Rio de Janeiro", localizacao: "Rio de Janeiro", data: "2025-04-15", alerta: "Deslizamento" },
            { nome: "Resende", localizacao: "Rio de Janeiro", data: "2025-03-25", alerta: "Enchente" },
            { nome: "Cabo Frio", localizacao: "Rio de Janeiro", data: "2025-02-20", alerta: "Enchente" },
        ],
        "Minas Gerais": [
            { nome: "Belo Horizonte", localizacao: "Minas Gerais", data: "2025-03-20", alerta: "Enchente" },
            { nome: "Uberaba", localizacao: "Minas Gerais", data: "2025-02-15", alerta: "Enchente" },
            { nome: "Guaxupé", localizacao: "Minas Gerais", data: "2025-01-10", alerta: "Incendio" },
        ],
    };

    // Filtra os dados com base no estado recebido
    const historicos = dados[estado] || [];

    // Define a cor do ícone com base no alerta
    const getIconColor = (alerta) => {
        switch (alerta.toLowerCase()) {
            case "enchente":
                return "green";
            case "deslizamento":
                return "orange";
            case "incendio":
                return "red";
            default:
                return "gray";
        }
    };

    return (
        <>
            <Header />
            <div className='Image'>
                <div className='shadow'></div>
            </div>
            <div className="historico-container">
                <div className="historico-header">
                    <h1>Histórico de Tragédias Climáticas - {estado}</h1>
                    <p className="historico-subtitle">
                        Acompanhe os eventos climáticos registrados em diferentes cidades do estado.
                    </p>
                </div>
                <table className="historico-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Localização</th>
                            <th>Data</th>
                            <th>Alerta</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historicos.map((item, index) => (
                            <tr key={index}>
                                <td>{item.nome}</td>
                                <td>{item.localizacao}</td>
                                <td>{item.data}</td>
                                <td className={`alerta ${item.alerta.toLowerCase()}`}>{item.alerta}</td>
                                <td>
                                    <FontAwesomeIcon
                                        icon={faCircle}
                                        style={{ color: getIconColor(item.alerta) }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
}

export default Historico;
