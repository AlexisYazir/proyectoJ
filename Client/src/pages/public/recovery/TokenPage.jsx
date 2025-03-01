import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const TokenPage = () => {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fff5eb', minHeight: '100vh' }}>
            <div className="card p-4 shadow" style={{ maxWidth: '450px', borderRadius: '10px', boxShadow: '0 20px 40px rgba(255, 102, 0, 0.2)', transition: 'all 0.3s ease' }}>
                <h2 className="card-title text-center mb-4">Token</h2>
                <form>
                    <div className="mb-3 position-relative">
                        <label htmlFor="token" className="form-label text-custom">Ingresa tu token</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faUser} style={{ color: '#db5802' }} />
                            </span>
                            <input id="token" type="text" className="form-control" {...("token", { required: true })} placeholder='Ingresa tu token' />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-custom-cancel text-white" type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}