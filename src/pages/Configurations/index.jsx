import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Tabs, Tab } from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './main.css';

function Configurations() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        notificacoes: true,
        tema: 'claro',
        regiao: 'sudeste',
        alertas: {
            incendio: true,
            alagamento: true,
            deslizamento: true
        }
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para salvar configurações
        console.log('Configurações salvas:', formData);
    };

    return (
        <>
            <Header />
            <Container className="my-5">
                <h1 className="mb-4">Configurações</h1>
                
                <Tabs defaultActiveKey="perfil" className="mb-4">
                    <Tab eventKey="perfil" title="Perfil">
                        <Card className="p-4 mt-3">
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nome</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="nome"
                                                value={formData.nome}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control 
                                                type="email" 
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                
                                <Button variant="primary" type="submit">
                                    Salvar Alterações
                                </Button>
                            </Form>
                        </Card>
                    </Tab>

                    <Tab eventKey="notificacoes" title="Notificações">
                        <Card className="p-4 mt-3">
                            <Form>
                                <Form.Check 
                                    type="switch"
                                    id="notificacoes"
                                    label="Receber notificações"
                                    checked={formData.notificacoes}
                                    onChange={handleChange}
                                    name="notificacoes"
                                    className="mb-3"
                                />

                                <h5 className="mt-4 mb-3">Alertas Ativos</h5>
                                <Form.Check 
                                    type="checkbox"
                                    id="incendio"
                                    label="Incêndios Florestais"
                                    checked={formData.alertas.incendio}
                                    onChange={() => setFormData(prev => ({
                                        ...prev,
                                        alertas: {
                                            ...prev.alertas,
                                            incendio: !prev.alertas.incendio
                                        }
                                    }))}
                                    className="mb-2"
                                />
                                <Form.Check 
                                    type="checkbox"
                                    id="alagamento"
                                    label="Alagamentos"
                                    checked={formData.alertas.alagamento}
                                    onChange={() => setFormData(prev => ({
                                        ...prev,
                                        alertas: {
                                            ...prev.alertas,
                                            alagamento: !prev.alertas.alagamento
                                        }
                                    }))}
                                    className="mb-2"
                                />
                                <Form.Check 
                                    type="checkbox"
                                    id="deslizamento"
                                    label="Risco de Deslizamento"
                                    checked={formData.alertas.deslizamento}
                                    onChange={() => setFormData(prev => ({
                                        ...prev,
                                        alertas: {
                                            ...prev.alertas,
                                            deslizamento: !prev.alertas.deslizamento
                                        }
                                    }))}
                                />
                            </Form>
                        </Card>
                    </Tab>

                    <Tab eventKey="preferencias" title="Preferências">
                        <Card className="p-4 mt-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Tema</Form.Label>
                                <Form.Select 
                                    name="tema"
                                    value={formData.tema}
                                    onChange={handleChange}
                                >
                                    <option value="claro">Claro</option>
                                    <option value="escuro">Escuro</option>
                                    <option value="sistema">Sistema</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Região de Monitoramento</Form.Label>
                                <Form.Select 
                                    name="regiao"
                                    value={formData.regiao}
                                    onChange={handleChange}
                                >
                                    <option value="sul">Sul</option>
                                    <option value="sudeste">Sudeste</option>
                                    <option value="centro-oeste">Centro-Oeste</option>
                                    <option value="nordeste">Nordeste</option>
                                    <option value="norte">Norte</option>
                                </Form.Select>
                            </Form.Group>
                        </Card>
                    </Tab>
                </Tabs>
            </Container>
            <Footer />
        </>
    );
}

export default Configurations;