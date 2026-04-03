import './main.css';
import MapComponent from '../../components/Map';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useParams } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registre os componentes do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const cityData = {
    "Minas Gerais": {
        flag: '/images/Bandeira_de_Minas_Gerais.svg.png',
        description: `Localizada na Zona da Mata mineira, na divisa com o Espírito Santo, Espera Feliz possui relevo montanhoso e clima tropical de altitude, com verões chuvosos e invernos amenos. A cidade é cercada por belas paisagens da Mata Atlântica e se destaca na produção de café. Devido ao terreno acidentado e às chuvas intensas, os desastres mais comuns são deslizamentos e enchentes, exigindo atenção constante à prevenção ambiental.`,
        mapCenter: [-19.8157, -43.9542],
        mapZoom: 12,
        riskAreas: [
            {
                coordinates: [
                    [-19.8200, -43.9600],
                    [-19.8180, -43.9550],
                    [-19.8220, -43.9520],
                    [-19.8240, -43.9580]
                ],
                color: 'blue',
                description: 'Área de risco de enchente (Região Central)'
            },
            {
                coordinates: [
                    [-19.8100, -43.9450],
                    [-19.8080, -43.9400],
                    [-19.8120, -43.9380],
                    [-19.8140, -43.9430]
                ],
                color: 'brown',
                description: 'Área de risco de deslizamento (Serra)'
            }
        ],
        neighborhoods: [
            {
                name: 'Beira Rio',
                risk: 'Enchentes',
                tips: [
                    'Evite construir a menos de 30m das margens do rio.',
                    'Mantenha calhas e bueiros sempre limpos.',
                    'Tenha um plano de evacuação familiar.',
                    'Fique atento à elevação do nível do rio.',
                    'Evite construir em terrenos instáveis.',
                    'Monitore sinais de deslizamento, como rachaduras ou desníveis no solo.'
                ]
            },
            {
                name: 'Morro do Valtair',
                risk: 'Deslizamentos',
                tips: [
                    'Observe trincas, árvores inclinadas e estalos no solo.',
                    'Evite escavações e cortes em encostas.',
                    'Não jogue lixo nas ladeiras e córregos.',
                    'Solicite vistoria da Defesa Civil ao menor sinal de risco.'
                ]
            },
            {
                name: 'Bairro Novo Horizonte',
                risk: 'Inundações',
                tips: [
                    'Evite trafegar por vias com histórico de alagamento.',
                    'Instale válvulas antirretorno nos encanamentos.',
                    'Guarde documentos em locais elevados.',
                    'Desligue aparelhos elétricos em caso de risco de inundação.'
                ]
            },
            {
                name: 'Alto da Serra',
                risk: 'Deslizamentos',
                tips: [
                    'Evite construções em áreas de encosta.',
                    'Monitore sinais de movimentação de solo.',
                    'Fique atento a inclinação de postes e árvores.',
                    'Tenha uma rota de evacuação segura.'
                ]
            },
            {
                name: 'Jardim das Águas',
                risk: 'Enchentes e alagamentos',
                tips: [
                    'Evite jogar lixo nas ruas e bueiros.',
                    'Acompanhe os alertas meteorológicos da Defesa Civil.',
                    'Eleve móveis e eletrodomésticos em caso de previsão de enchente.',
                    'Não transite em ruas com água acima do meio-fio.'
                ]
            },
            {
                name: 'Vale Verde',
                risk: 'Enchentes e erosões',
                tips: [
                    'Reforce muros e fundações vulneráveis.',
                    'Mantenha sistemas de drenagem limpos.',
                    'Evite construir em terrenos instáveis.',
                    'Monitore sinais de deslizamento, como rachaduras ou desníveis no solo.'
                ]
            }
        ],
        tragedies: {
            labels: ['Enchentes', 'Deslizamentos', 'Outros'],
            data: [40, 30, 10],
        },
    },
    "São Paulo": {
        flag: '/images/Bandeira_do_estado_de_São_Paulo.svg.png',
        description: `São Paulo é a maior cidade do Brasil, com clima subtropical e chuvas concentradas no verão. A cidade enfrenta desafios como enchentes em áreas urbanas e deslizamentos em regiões periféricas. A infraestrutura urbana e a densidade populacional tornam a prevenção essencial.`,
        mapCenter: [-23.5505, -46.6333],
        mapZoom: 12,
        riskAreas: [
            {
                coordinates: [
                    [-23.5550, -46.6400],
                    [-23.5530, -46.6350],
                    [-23.5570, -46.6320],
                    [-23.5590, -46.6380]
                ],
                color: 'blue',
                description: 'Área de risco de enchente (Zona Leste)'
            },
            {
                coordinates: [
                    [-23.5450, -46.6250],
                    [-23.5430, -46.6200],
                    [-23.5470, -46.6180],
                    [-23.5490, -46.6230]
                ],
                color: 'orange',
                description: 'Área de risco de alagamento (Centro)'
            },
            {
                coordinates: [
                    [-23.5650, -46.6500],
                    [-23.5630, -46.6450],
                    [-23.5670, -46.6430],
                    [-23.5690, -46.6480]
                ],
                color: 'brown',
                description: 'Área de risco de deslizamento (Zona Sul)'
            }
        ],
        neighborhoods: [
            {
                name: 'Vila Mariana',
                risk: 'Enchentes',
                tips: [
                    'Evite áreas baixas durante chuvas intensas.',
                    'Mantenha bueiros limpos.',
                    'Tenha um plano de evacuação.',
                    'Evite estacionar em áreas de risco.',
                    'Mantenha telhados e calhas desobstruídos.',
                    'Monte um kit de emergência com itens essenciais.'
                ]
            },
            {
                name: 'Lapa',
                risk: 'Alagamentos',
                tips: [
                    'Evite transitar por ruas alagadas.',
                    'Eleve móveis e aparelhos eletrônicos quando possível.',
                    'Monitore alertas da Defesa Civil.',
                    'Desligue a energia se houver risco de inundação.'
                ]
            },
            {
                name: 'Pinheiros',
                risk: 'Inundações e queda de árvores',
                tips: [
                    'Evite áreas com histórico de alagamento.',
                    'Não estacione sob árvores em dias de tempestade.',
                    'Acompanhe previsões meteorológicas.',
                    'Revise calhas e ralos com frequência.'
                ]
            },
            {
                name: 'Mooca',
                risk: 'Enchentes e deslizamentos',
                tips: [
                    'Evite ruas com histórico de alagamentos.',
                    'Verifique rachaduras em muros e pisos.',
                    'Tenha uma rota de fuga segura.',
                    'Não bloqueie saídas de água com lixo.'
                ]
            },
            {
                name: 'Itaim Bibi',
                risk: 'Enchentes',
                tips: [
                    'Evite circular a pé ou de carro durante fortes chuvas.',
                    'Não force passagem por ruas alagadas.',
                    'Guarde documentos importantes em local seco e alto.',
                    'Mantenha-se informado pelos canais oficiais.'
                ]
            },
            {
                name: 'Butantã',
                risk: 'Deslizamentos e alagamentos',
                tips: [
                    'Evite moradias próximas a encostas.',
                    'Denuncie entulhos descartados irregularmente.',
                    'Mantenha telhados e calhas desobstruídos.',
                    'Monte um kit de emergência com itens essenciais.'
                ]
            }
        ],
        tragedies: {
            labels: ['Enchentes', 'Deslizamentos', 'Outros'],
            data: [50, 20, 15],
        },
    },
    "Rio de Janeiro": {
        flag: '/images/Bandeira_do_estado_do_Rio_de_Janeiro.svg.png',
        description: `O Rio de Janeiro é conhecido por seu relevo montanhoso e clima tropical. A cidade enfrenta enchentes em áreas baixas e deslizamentos em encostas. A prevenção é crucial para minimizar os impactos dos desastres naturais.`,
        mapCenter: [-22.9068, -43.1729],
        mapZoom: 12,
        riskAreas: [
            {
                coordinates: [
                    [-22.9100, -43.1800],
                    [-22.9080, -43.1750],
                    [-22.9120, -43.1720],
                    [-22.9140, -43.1780]
                ],
                color: 'blue',
                description: 'Área de risco de enchente (Zona Norte)'
            },
            {
                coordinates: [
                    [-22.9000, -43.1650],
                    [-22.8980, -43.1600],
                    [-22.9020, -43.1580],
                    [-22.9040, -43.1630]
                ],
                color: 'brown',
                description: 'Área de risco de deslizamento (Encostas)'
            },
            {
                coordinates: [
                    [-22.9200, -43.1900],
                    [-22.9180, -43.1850],
                    [-22.9220, -43.1820],
                    [-22.9240, -43.1880]
                ],
                color: 'orange',
                description: 'Área de risco de alagamento (Baixada)'
            }
        ],
        neighborhoods: [
            {
                name: 'Copacabana',
                risk: 'Enchentes',
                tips: [
                    'Evite áreas alagadas.',
                    'Mantenha calhas limpas.',
                    'Tenha um plano de evacuação.',
                    'Evite estacionar em áreas de risco.'
                ]
            },
            {
                name: 'Jardim Botânico',
                risk: 'Deslizamentos',
                tips: [
                    'Evite áreas próximas a encostas em dias de chuva.',
                    'Corte árvores com risco de queda.',
                    'Conheça rotas de fuga.',
                    'Fique atento a rachaduras ou estalos no solo e nas paredes.'
                ]
            },
            {
                name: 'Centro',
                risk: 'Alagamentos repentinos',
                tips: [
                    'Evite transitar a pé em vias alagadas.',
                    'Proteja equipamentos elétricos.',
                    'Tenha lanternas e kits de emergência.',
                    'Desligue a energia em caso de inundação.'
                ]
            },
            {
                name: 'Grajaú',
                risk: 'Inundações e deslizamentos',
                tips: [
                    'Observe sinais de infiltrações em casa.',
                    'Mantenha contatos de emergência acessíveis.',
                    'Prepare uma mochila com itens essenciais.',
                    'Não bloqueie saídas de água com lixo.'
                ]
            },
            { 
                name: 'Ipanema', 
                risk: 'Enchentes', 
                tips: [
                    'Evite áreas alagadas.', 
                    'Mantenha calhas limpas.', 
                    'Tenha um plano de evacuação.', 
                    'Evite estacionar em áreas de risco.'
                ] 
            },
            { 
                name: 'Leblon', 
                risk: 'Deslizamentos', 
                tips: [
                    'Evite áreas de risco.', 
                    'Mantenha a vegetação local.', 
                    'Tenha um plano de evacuação.', 
                    'Evite estacionar em áreas de risco.'
                ] 
            }
        ],
        tragedies: {
            labels: ['Enchentes', 'Deslizamentos', 'Outros'],
            data: [60, 25, 5],
        },
    },
};

function Results() {
    const { city } = useParams();
    const cityInfo = cityData[city] || cityData["Minas Gerais"]; // Default to Espera Feliz if city not found

    // Dados do gráfico
    const chartData = {
        labels: cityInfo.tragedies.labels,
        datasets: [
            {
                data: cityInfo.tragedies.data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return (
        <>
            <Header />
            <div className="container-fluid px-4 mt-5">

                {/* City Information Section */}
                <div className="section-container mb-5">
                    <div className="citysearch row align-items-center">
                        <div className="flag-space col-lg-4 text-center">
                            <div className="flag mx-auto" style={{ backgroundImage: `url(${cityInfo.flag})` }}></div>
                            <h5 className="mt-4">{city}</h5>
                        </div>
                        <div className="city-text col-lg-8">
                            <p className="city-presentation">{cityInfo.description}</p>
                        </div>
                    </div>
                </div>

                {/* Tragedy Chart Section */}
                <div className="section-container mb-5">
                    <h2 className="text-center mb-4">Gráfico de Tragédias</h2>
                    <div className="d-flex justify-content-center">
                        <div className="chart-container">
                            <Doughnut data={chartData} />
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="section-container mb-5">
                    <div className="text-center mb-4">
                        <h5>MAPA INTERATIVO</h5>
                    </div>
                    <div className="arearisk text-center mb-4">
                        <h1>Áreas de Risco</h1>
                    </div>
                    <div className="maps d-flex justify-content-center">
                        <div className="map-space shadow">
                            <MapComponent 
                                center={cityInfo.mapCenter}
                                zoom={cityInfo.mapZoom}
                                riskAreas={cityInfo.riskAreas}
                            />
                        </div>
                    </div>
                </div>

                {/* Neighborhoods Section */}
                <div className="section-container mb-5">
                    <h2 className="text-center mb-4">Bairros com Maior Risco</h2>
                    <div className="row g-4">
                        {cityInfo.neighborhoods.map((neighborhood, index) => (
                            <div key={index} className="col-lg-4 col-md-6">
                                <div className="card shadow-sm h-100">
                                    <div className="card-body">
                                        <h4 className="card-title text-center">{neighborhood.name}</h4>
                                        <h6 className="text-center text-danger">Risco: {neighborhood.risk}</h6>
                                        <ul className="pt-3">
                                            {neighborhood.tips.map((tip, i) => (
                                                <li key={i}>{tip}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Results;