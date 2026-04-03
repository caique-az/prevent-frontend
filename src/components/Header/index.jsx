import "./header.css";
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTornado } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isClosing, setIsClosing] = useState(false);
    const navigate = useNavigate();

    const estadoMap = {
        'sao paulo': 'São Paulo',
        'são paulo': 'São Paulo',
        'sp': 'São Paulo',
        'rio de janeiro': 'Rio de Janeiro',
        'rj': 'Rio de Janeiro',
        'minas gerais': 'Minas Gerais',
        'mg': 'Minas Gerais',
    };

    // Mapa de bairros para estados
    const bairroToEstado = {
        // Minas Gerais
        'beira rio': 'Minas Gerais',
        'morro do valtair': 'Minas Gerais',
        'bairro novo horizonte': 'Minas Gerais',
        'novo horizonte': 'Minas Gerais',
        'alto da serra': 'Minas Gerais',
        'jardim das aguas': 'Minas Gerais',
        'jardim das águas': 'Minas Gerais',
        'vale verde': 'Minas Gerais',
        
        // São Paulo
        'vila mariana': 'São Paulo',
        'lapa': 'São Paulo',
        'pinheiros': 'São Paulo',
        'mooca': 'São Paulo',
        'itaim bibi': 'São Paulo',
        'itaim': 'São Paulo',
        'butanta': 'São Paulo',
        'butantã': 'São Paulo',
        
        // Rio de Janeiro
        'copacabana': 'Rio de Janeiro',
        'jardim botanico': 'Rio de Janeiro',
        'jardim botânico': 'Rio de Janeiro',
        'centro': 'Rio de Janeiro',
        'grajau': 'Rio de Janeiro',
        'grajaú': 'Rio de Janeiro',
        'ipanema': 'Rio de Janeiro',
        'leblon': 'Rio de Janeiro',
    };

    const availableEstados = ['São Paulo', 'Rio de Janeiro', 'Minas Gerais'];

    const normalizedIncludes = (text, term) =>
        text.normalize('NFD').replace(/[^\w\s]/g, '').toLowerCase()
            .includes(
                term
                    .normalize('NFD')
                    .replace(/[^\w\s]/g, '')
                    .toLowerCase()
            );

    const handleSearch = () => {
        const value = searchTerm.trim().toLowerCase();
        if (!value) return;

        // Normalizar o valor de busca
        const normalizedValue = value.normalize('NFD').replace(/[^\w\s]/g, '').toLowerCase();

        // Primeiro, tentar encontrar um estado
        const matchedEstado = estadoMap[value];
        if (matchedEstado) {
            navigate(`/results/${matchedEstado}`);
            return;
        }

        // Se não encontrou estado, tentar encontrar um bairro
        const matchedBairro = bairroToEstado[value] || 
                             bairroToEstado[normalizedValue];
        
        if (matchedBairro) {
            navigate(`/results/${matchedBairro}`);
            return;
        }

        // Se não encontrou nada, ir para página de sem resultados
        navigate('/no-results');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <header className="header">
            <div className="row">
                <div className="col-lg-3 logospace d-flex justify-content-center align-items-center">
                    <Link to="/" className='Logo ms-5 text-decoration-none'>
                        <FontAwesomeIcon className="tornado" icon={faTornado} style={{ color: "#a9bddf" }} />
                        <span className="logo text-light">Prevent</span>
                    </Link>
                </div>
                <div className="searchspace col-lg-6 d-flex justify-content-center align-items-center">
                    <div className={`search ms-4 position-relative ${(() => {
                        const term = searchTerm.trim();
                        if (!term) return '';
                        const filteredEstados = availableEstados.filter((estado) =>
                            normalizedIncludes(estado, term)
                        );
                        const filteredBairros = Object.keys(bairroToEstado).filter((bairro) =>
                            normalizedIncludes(bairro, term)
                        );
                        return filteredEstados.length > 0 || filteredBairros.length > 0 ? 'search-active' : '';
                    })()}`}>
                        <input
                            type="text"
                            id="searchinput"
                            placeholder="Pesquisar estado ou bairro (ex: SP, Leblon, Copacabana)"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            onKeyDown={handleKeyDown}
                        />

                        <button
                            type="button"
                            className="search-button"
                            onClick={handleSearch}
                            aria-label="Buscar"
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>

                        {(() => {
                            const term = searchTerm.trim();
                            if (!term) return null;

                            const filteredEstados = availableEstados.filter((estado) =>
                                normalizedIncludes(estado, term)
                            );

                            const filteredBairros = Object.keys(bairroToEstado)
                                .filter((bairro) => normalizedIncludes(bairro, term))
                                .map(bairro => ({
                                    name: bairro.split(' ').map(word => 
                                        word.charAt(0).toUpperCase() + word.slice(1)
                                    ).join(' '),
                                    estado: bairroToEstado[bairro]
                                }));

                            if (filteredEstados.length === 0 && filteredBairros.length === 0) return null;

                            return (
                                <ul className={`search-suggestions ${isClosing ? 'closing' : ''}`}>
                                    {filteredEstados.length > 0 && (
                                        <>
                                            <li className="suggestion-category">Estados</li>
                                            {filteredEstados.map((estado) => (
                                                <li
                                                    key={estado}
                                                    className="suggestion-item"
                                                    onClick={() => {
                                                        navigate(`/results/${estado}`);
                                                        setSearchTerm('');
                                                    }}
                                                >
                                                    📍 {estado}
                                                </li>
                                            ))}
                                        </>
                                    )}
                                    {filteredBairros.length > 0 && (
                                        <>
                                            <li className="suggestion-category">Bairros</li>
                                            {filteredBairros.map((bairro, index) => (
                                                <li
                                                    key={`${bairro.name}-${index}`}
                                                    className="suggestion-item"
                                                    onClick={() => {
                                                        navigate(`/results/${bairro.estado}`);
                                                        setSearchTerm('');
                                                    }}
                                                >
                                                    🏘️ {bairro.name} <span className="suggestion-estado">({bairro.estado})</span>
                                                </li>
                                            ))}
                                        </>
                                    )}
                                </ul>
                            );
                        })()}
                    </div>
                </div>

                <div className="dropdown col-lg-3 d-flex align-items-center">
                    <button className="btn dropdown-toggle-no-caret" type="button" id="menuDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        <FontAwesomeIcon className="bars text-light" icon={faBars} />
                    </button>
                    <ul className="dropdown-menu custom-dropdown" aria-labelledby="menuDropdown">
                        <li>
                            <Link className="dropdown-item" to="/Projects">Sobre o Projeto</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="/Configurations">Configurações</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;