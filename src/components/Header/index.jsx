import "./header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTornado } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';

function Header() {
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
                    <div className="search ms-4">
                        <input type="text" id="searchinput" placeholder="Pesquisar bairro ou cidade" />
                        <label htmlFor="searchinput">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </label>
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