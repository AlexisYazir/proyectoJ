import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'; 

import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  

export function Footer() {
    return (
        <footer className="footer container-fluid">
            <div className="row text-center text-md-start">
                
                <div className="col-md-4 footer-section">
                    <h3>Sobre Nosotros</h3>
                    <p>
                        Somos una empresa comprometida con la innovación y el desarrollo. 
                        Buscamos ofrecer soluciones eficientes y accesibles para todos.
                    </p>
                </div>

                <div className="col-md-4 footer-section">
                    <h3>Misión y Visión</h3>
                    <p><strong>Misión:</strong> Brindar productos y servicios de alta calidad con un enfoque sostenible.</p>
                    <p><strong>Visión:</strong> Ser líderes en nuestro sector a nivel global.</p>
                </div>

                <div className="col-md-4 footer-section">
                    <h3>Redes Sociales</h3>
                    <div className="social-icons d-flex justify-content-center justify-content-md-start gap-3">
                        <a href="#" className="social-link">
                            <FontAwesomeIcon icon={faFacebook} size="2x" />
                        </a>
                        <a href="#" className="social-link">
                            <FontAwesomeIcon icon={faTwitter} size="2x" />
                        </a>
                        <a href="#" className="social-link">
                            <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </a>
                    </div>
                </div>

            </div>

            <div className="text-center mt-4">
                <p className="footer-copy">&copy; 2025 Huellitas Shop. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;
