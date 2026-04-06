import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRoute,
    faMapMarkerAlt,
    faExclamationTriangle,
    faPhone,
    faShieldAlt,
    faPersonWalking,
    faLocationDot,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import './main.css';

// Corrigir ícones padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
    iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
    shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

// Componente para atualizar a posição do mapa
function MapFlyTo({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, zoom || 15, { animate: true, duration: 1 });
        }
    }, [center, zoom, map]);
    return null;
}

// Dados dos pontos de encontro
const pontosEncontro = [
    {
        id: 1,
        nome: 'Praça Central',
        posicao: [-23.5505, -46.6333],
        endereco: 'Rua Principal, 100 - Centro',
        capacidade: '500 pessoas',
        tipo: 'encontro'
    },
    {
        id: 2,
        nome: 'Escola Municipal São Paulo',
        posicao: [-23.555, -46.638],
        endereco: 'Av. das Palmeiras, 250 - Vila Nova',
        capacidade: '300 pessoas (área coberta)',
        tipo: 'encontro'
    },
    {
        id: 3,
        nome: 'Ginásio Poliesportivo',
        posicao: [-23.548, -46.630],
        endereco: 'Rua dos Esportes, 500 - Jardim América',
        capacidade: '800 pessoas',
        tipo: 'encontro'
    },
];

// Dados das áreas de risco
const areasRisco = [
    {
        id: 1,
        nome: 'Zona de Enchente - Rua das Flores',
        coordenadas: [
            [-23.552, -46.635],
            [-23.552, -46.637],
            [-23.554, -46.637],
            [-23.554, -46.635],
            [-23.552, -46.635]
        ],
        tipo: 'enchente'
    },
    {
        id: 2,
        nome: 'Encosta instável - Vila Nova',
        coordenadas: [
            [-23.558, -46.640],
            [-23.558, -46.642],
            [-23.560, -46.642],
            [-23.560, -46.640],
            [-23.558, -46.640]
        ],
        tipo: 'deslizamento'
    },
];

function RotasSeguras() {
    const [mapCenter, setMapCenter] = useState([-23.5505, -46.6333]);
    const [mapZoom, setMapZoom] = useState(13);
    const [pontoAtivo, setPontoAtivo] = useState(null);

    // Animação ao scroll
    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observerRef.current.observe(el));

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    const handlePontoClick = (ponto) => {
        setMapCenter(ponto.posicao);
        setMapZoom(16);
        setPontoAtivo(ponto.id);

        const mapSection = document.querySelector('.rotas-map-section');
        if (mapSection) {
            mapSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <>
            <Header />
            <main className="rotas-page">
                {/* Hero Section */}
                <section className="rotas-hero">
                    <div className="rotas-hero-content animate-on-scroll">
                        <span className="rotas-badge">
                            <FontAwesomeIcon icon={faRoute} />
                            Evacuação
                        </span>
                        <h1 className="rotas-hero-title">Rotas Seguras</h1>
                        <p className="rotas-hero-subtitle">
                            Conheça os pontos de encontro, rotas de evacuação e áreas de risco
                            da sua região. Esteja preparado para qualquer emergência.
                        </p>
                    </div>
                </section>

                {/* Mapa */}
                <section className="rotas-map-section">
                    <div className="rotas-container">
                        <div className="rotas-map-wrapper animate-on-scroll">
                            <div className="rotas-map-header">
                                <h2>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                    Mapa de Evacuação
                                </h2>
                                <div className="rotas-map-actions">
                                    {pontosEncontro.map((ponto) => (
                                        <button
                                            key={ponto.id}
                                            className={`rotas-map-btn ${pontoAtivo === ponto.id ? 'active' : ''}`}
                                            onClick={() => handlePontoClick(ponto)}
                                        >
                                            <FontAwesomeIcon icon={faLocationDot} />
                                            {ponto.nome.split(' ').slice(0, 2).join(' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="rotas-map-container">
                                <MapContainer
                                    center={mapCenter}
                                    zoom={mapZoom}
                                    style={{ height: '100%', width: '100%' }}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <MapFlyTo center={mapCenter} zoom={mapZoom} />

                                    {/* Pontos de encontro */}
                                    {pontosEncontro.map((ponto) => (
                                        <Marker key={ponto.id} position={ponto.posicao}>
                                            <Popup>
                                                <div style={{ textAlign: 'center', minWidth: '180px' }}>
                                                    <strong>{ponto.nome}</strong>
                                                    <br />
                                                    <small>{ponto.endereco}</small>
                                                    <br />
                                                    <small style={{ color: '#0c6681' }}>
                                                        Capacidade: {ponto.capacidade}
                                                    </small>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    ))}

                                    {/* Áreas de risco */}
                                    {areasRisco.map((area) => (
                                        <Polyline
                                            key={area.id}
                                            positions={area.coordenadas}
                                            pathOptions={{
                                                color: area.tipo === 'enchente' ? '#3498db' : '#8b4513',
                                                fillOpacity: 0.2,
                                                weight: 3
                                            }}
                                        >
                                            <Popup>
                                                <div style={{ textAlign: 'center' }}>
                                                    <strong>⚠️ {area.nome}</strong>
                                                </div>
                                            </Popup>
                                        </Polyline>
                                    ))}
                                </MapContainer>
                            </div>
                            <div className="rotas-map-legend">
                                <div className="legend-item">
                                    <span className="legend-dot" style={{ background: '#2196F3' }}></span>
                                    Ponto de Encontro
                                </div>
                                <div className="legend-item">
                                    <span className="legend-dot" style={{ background: '#3498db' }}></span>
                                    Área de Enchente
                                </div>
                                <div className="legend-item">
                                    <span className="legend-dot" style={{ background: '#8b4513' }}></span>
                                    Área de Deslizamento
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pontos de Encontro */}
                <section className="rotas-pontos-section">
                    <div className="rotas-container">
                        <div className="section-header animate-on-scroll">
                            <span className="section-badge">Pontos de Encontro</span>
                            <h2 className="section-title">Locais Seguros de Reunião</h2>
                            <p className="section-subtitle">
                                Em caso de evacuação, dirija-se ao ponto de encontro mais próximo.
                                Clique para visualizar no mapa.
                            </p>
                        </div>

                        <div className="rotas-pontos-grid">
                            {pontosEncontro.map((ponto, index) => (
                                <div
                                    key={ponto.id}
                                    className={`rotas-ponto-card animate-on-scroll ${pontoAtivo === ponto.id ? 'active' : ''}`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                    onClick={() => handlePontoClick(ponto)}
                                >
                                    <div className="rotas-ponto-icon">
                                        <FontAwesomeIcon icon={faShieldAlt} />
                                    </div>
                                    <div className="rotas-ponto-content">
                                        <h3>{ponto.nome}</h3>
                                        <p className="rotas-ponto-endereco">{ponto.endereco}</p>
                                        <p className="rotas-ponto-capacidade">
                                            <FontAwesomeIcon icon={faPersonWalking} />
                                            {ponto.capacidade}
                                        </p>
                                    </div>
                                    <div className="rotas-ponto-action">
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Áreas de Risco */}
                <section className="rotas-risco-section">
                    <div className="rotas-container">
                        <div className="section-header animate-on-scroll">
                            <span className="section-badge-warning">
                                <FontAwesomeIcon icon={faExclamationTriangle} />
                                Atenção
                            </span>
                            <h2 className="section-title">Áreas de Risco</h2>
                            <p className="section-subtitle">
                                Evite estas áreas durante emergências climáticas.
                            </p>
                        </div>

                        <div className="rotas-risco-grid animate-on-scroll">
                            {areasRisco.map((area) => (
                                <div key={area.id} className="rotas-risco-card">
                                    <div
                                        className="rotas-risco-indicator"
                                        style={{
                                            background: area.tipo === 'enchente' ? '#3498db' : '#8b4513'
                                        }}
                                    ></div>
                                    <div className="rotas-risco-content">
                                        <h4>{area.nome}</h4>
                                        <span className="rotas-risco-tipo">
                                            {area.tipo === 'enchente' ? '🌊 Enchente' : '⛰️ Deslizamento'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Emergência */}
                        <div className="rotas-emergencia animate-on-scroll">
                            <FontAwesomeIcon icon={faPhone} className="rotas-emergencia-icon" />
                            <div>
                                <h3>Em caso de emergência</h3>
                                <p>Ligue para a Defesa Civil: <strong>199</strong></p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default RotasSeguras;