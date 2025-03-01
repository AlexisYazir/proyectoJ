import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export const AuthUser = () => {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fff5eb', minHeight: '100vh' }}>
            <div className="card p-4 shadow" style={{ maxWidth: '450px', borderRadius: '10px', boxShadow: '0 20px 40px rgba(255, 102, 0, 0.2)', transition: 'all 0.3s ease' }}>
                <h2 className="card-title text-center mb-4">Verificación</h2>
                <form>
                    <div className="mb-3 position-relative">
                        <label htmlFor="username" className="form-label text-custom">Nombre de usuario</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faUser} style={{ color: '#db5802' }} />
                            </span>
                            <input id="username" type="text" className="form-control" {...("username", { required: true })} placeholder='Ingresa tu nombre de usuario' />
                        </div>
                    </div>

                    <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-custom text-white" type="submit">Enviar</button>
                        <Link to="/login" className="btn btn-custom-cancel text-white">Cancelar</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AuthUser