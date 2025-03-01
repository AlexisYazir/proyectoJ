import { Button, Container, Row, Col } from "react-bootstrap";
import { FaUtensils, FaTint, FaCircle, FaPlay } from "react-icons/fa";

export const ControlDevicesPage = () => {

    return (
        <Container className="mt-4" >
            <h1 className="text-center text-orange">Panel de Control IoT</h1>
            <p className="text-center">Administra tu dispensador de comida y agua para mascotas.</p>

            <Row className="justify-content-center">
                <Col xs={12} sm={6} lg={4} className="mb-4">
                    <div className="card-iot">
                        <div className="content-iot">
                            <div className="text-center">
                                <FaUtensils className="icon-iot" size={40} /> 
                                <h2 className="title-iot mb-4">COMIDA</h2>
                            </div>

                            <div className="status-iot d-flex align-items-center">
                                <div>
                                    <p className="status-label-iot">Estado Contenedor de Comida</p>
                                    <p className="status-text-iot">
                                        <FaCircle className="me-2 fs-6" /> 
                                        Lleno
                                    </p>
                                </div>
                            </div>

                            <Button className="btn btn-custom-cancel">
                                <FaPlay className="me-2" /> 
                                Dispensar Comida
                            </Button>
                        </div>
                    </div>
                </Col>

                <Col xs={12} sm={6} lg={4} className="mb-4">
                    <div className="card-iot">
                        <div className="content-iot">
                            <div className="text-center">
                                <FaTint className="icon-iot" size={40} />
                                <h2 className="title-iot mb-4">AGUA</h2>
                            </div>

                            <div className="status-iot d-flex align-items-center">
                                <div>
                                    <p className="status-label-iot">Estado Contenedor de Agua</p>
                                    <p className="status-text-iot">
                                        <FaCircle className="me-2 fs-6" /> 
                                        Lleno
                                    </p>
                                </div>
                            </div>

                            <Button className="btn btn-custom-cancel">
                                <FaPlay className="me-2" />
                                Dispensar Agua
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ControlDevicesPage;
