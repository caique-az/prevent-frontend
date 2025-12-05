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

        const matchedEstado = estadoMap[value];

        if (matchedEstado) {
            navigate(`/results/${matchedEstado}`);
            return;
        }

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
                        const filtered = availableEstados.filter((estado) =>
                            normalizedIncludes(estado, term)
                        );
                        return filtered.length > 0 ? 'search-active' : '';
                    })()}`}>
                        <input
                            type="text"
                            id="searchinput"
                            placeholder="Pesquisar estado (ex: SP, Rio de Janeiro)"
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

                            const filtered = availableEstados.filter((estado) =>
                                normalizedIncludes(estado, term)
                            );

                            if (filtered.length === 0) return null;

                            return (
                                <ul className="search-suggestions">
                                    {filtered.map((estado) => (
                                        <li
                                            key={estado}
                                            onClick={() => {
                                                navigate(`/results/${estado}`);
                                                setSearchTerm(estado);
                                            }}
                                        >
                                            {estado}
                                        </li>
                                    ))}
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